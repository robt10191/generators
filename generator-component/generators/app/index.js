let Generator = require('yeoman-generator');

module.exports = class extends Generator {
    
    constructor(args, opts) {
        super(args, opts);
    }

    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'componentName',
            message: 'your component name'
        }]).then((answers) => {
            this._makeComponentFolder(answers.componentName);
        });
    }

    _makeComponentFolder(componentName) {
        let basePath = './' + componentName + '/base/';
        let mobilePath = './' + componentName + '/mobile/';
        let webPath = './' + componentName + '/web/';
        let componentBase = componentName + '.component';
        let componentComponent = componentBase + '.ts';
        let componentView = componentBase + '.html';
        let componentStyle = componentBase + '.scss';
        this.fs.write(basePath + '/' + componentComponent, '');
        this.fs.write(basePath + '/' + componentView, '');
        this.fs.write(basePath + '/' + componentStyle, '');
        this.fs.write(mobilePath + '/' + componentComponent, '');
        this.fs.write(mobilePath + '/' + componentView, '');
        this.fs.write(mobilePath + '/' + componentStyle, '');
        this.fs.write(webPath + '/' + componentComponent, '');
        this.fs.write(webPath + '/' + componentView, '');
        this.fs.write(webPath + '/' + componentStyle, '');
    }
};