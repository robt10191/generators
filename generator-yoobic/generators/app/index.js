let Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    initializing() {
        this._appConfig = this.fs.readJSON(this.templatePath('../../../../appData/appConfig.json'));
        this._yoobicDependencyDefinitions = this.fs.readJSON(this.templatePath('../../../../appData/yoobicDependencies.json'));
    }

    writing() {
        this._makeAppFolders(this._appConfig);
    }

    _makePageFolder(commonLibPath, page) {

        let basePath = commonLibPath + 'pages/' + page.pageName + '/base/';
        let pageBase = page.pageName + '.component';
        let pageComponent = pageBase + '.ts';
        let pageView = pageBase + '.html';
        let pageStyle = pageBase + '.scss';

        page.platforms.forEach((platformName) => {

            let pagePath = basePath + '/pages/' + page.pageName + '/' + (platformName === 'mobile' ? 'ionic' : platformName) + '/';

            this.fs.write(pagePath + pageView, '');
            this.fs.write(pagePath + pageStyle, '');

            let _defaultMethods = [];
            page.components.forEach((component) => {
                if (this._yoobicDependencyDefinitions.components[component.selector].defaultMethods) {
                    this._yoobicDependencyDefinitions.components[component.selector].defaultMethods.forEach((method) => {
                        _defaultMethods.push(method);
                    });
                }
            });

            this.fs.copyTpl(this.templatePath(platformName + 'Component.ts'),
                this.destinationPath(pagePath + pageComponent), {
                    data: {
                        pageClassName: this._snakeToClassName(page.pageName),
                        pageName: page.pageName,
                        defaultMethods: _defaultMethods
                    }
                });
        });

    }

    _snakeToClassName(string) {
        let camel = string.charAt(0).toUpperCase() + string.slice(1);
        return camel.replace(/(\-\w)/g, function (m) {
            return m[1].toUpperCase();
        });

    }

    _addComponentDependencies(commonLibPath, page, component) {
        let componentDefinition = this._yoobicDependencyDefinitions.components[component.selector];
        let baseModuleImportStatement = 'import { ' + componentDefinition.module + ' } from \'' + componentDefinition.modulePath;
        page.platforms.forEach((platformName) => {
            //TODO: Will need to amend existing files if more than one component dependency
            this.fs.write(commonLibPath + 'common.' + platformName + '.module.ts', baseModuleImportStatement + '/' + platformName + '\';');
        });
    }

    _addComponentToPageFiles(pagePath, page, component) {
        page.platforms.forEach((platform) => {});
    }

    _addComponents(commonLibPath, page) {
        page.components.forEach((component) => {
            this._addComponentDependencies(commonLibPath, page, component);
            this._addComponentToPageFiles(commonLibPath + '/pages/' + page.pageName, page, component);
        });
    }

    _makePages(commonLibPath, pages) {
        pages.forEach((page) => {
            this._makePageFolder(commonLibPath, page);
            this._addComponents(commonLibPath, page);
        });
    }

    _makeAppFolders(appConfig) {
        let commonLibPath = appConfig.appName + '/common/lib/';

        this._makePages(commonLibPath, appConfig.pages);

        this.fs.write(commonLibPath + 'common.ionic.ts', '');
        this.fs.write(commonLibPath + 'common.web.ts', '');

    }

};