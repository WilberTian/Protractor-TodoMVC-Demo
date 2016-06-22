var todomvcHelper = require('./todomvc.helper');
var perfRunner  = require('protractor-perf');
var fs = require('fs');

describe('angularjs TodoMVC', function() {

  // function to generate screenshot
  function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);

    stream.write(new Buffer(data, 'base64'));
    stream.end();
  }


  var perf = new perfRunner(protractor, browser);
  
  // verify page title
  it('should have a title', function() {
    browser.get('http://todomvc.com/examples/angularjs/#/');
    browser.takeScreenshot().then(function (png) {
      writeScreenShot(png, 'screenshots/screenshot-0.png');
    });
    perf.start();
    expect(browser.getTitle()).toEqual('AngularJS • TodoMVC');
    perf.stop();

    if (perf.isEnabled) {
      expect(perf.getStats('meanFrameTime')).toBeLessThan(30);
    }
  });
  
  // verify page header
  todomvcHelper.verifyHeaderElementText('h3', 'AngularJS');
  todomvcHelper.verifyHeaderElementText('h1', 'todos');
  
  // verify the input is present
  it('should verify if the main web elements are present in the page', function() {
    var newTodo = element(by.id('new-todo'));
    browser.takeScreenshot().then(function (png) {
      writeScreenShot(png, 'screenshots/screenshot-1.png');
    });
    expect(newTodo.isPresent()).toBe(true);
  });

  // add an item into todo list
  todomvcHelper.addTodoItem('New item to test add');

  // verify the add operation is success
  it('should be able to add items in the to do list', function() {
    var todoLabel = element(by.css('.view .ng-binding'));
    browser.takeScreenshot().then(function (png) {
      writeScreenShot(png, 'screenshots/screenshot-2.png');
    });
    perf.start();
    expect(todoLabel.getText()).toEqual(text);
    perf.stop();

    if (perf.isEnabled) {
      expect(perf.getStats('meanFrameTime')).toBeLessThan(30);
    }
  });

  // clear the todo list
  it('should be able to clear the to do list', function() {
    var toogleAllCheckBox = element(by.id('toggle-all'));
    var clearCompletedButton = element(by.id('clear-completed'));
    var viewDiv = element(by.className('view'));
    perf.start();
    toogleAllCheckBox.click();
    clearCompletedButton.click();
    browser.takeScreenshot().then(function (png) {
      writeScreenShot(png, 'screenshots/screenshot-3.png');
    });
    expect(viewDiv.isPresent()).toBe(false);
    perf.stop();

    if (perf.isEnabled) {
      expect(perf.getStats('meanFrameTime')).toBeLessThan(30);
    }
  });

  todomvcHelper.addTodoItem('New item');

  // verify the completed items can be added into completed list
  it('should be able to complete items and then add them to the completed list', function() {
    var completedLink = element.all(by.css('#filters li .selected')).last();
    var toggleAll = element(by.id('toggle-all'));
    var completedList = element(by.css('#todo-list .completed .view .ng-binding'));
    perf.start();
    toggleAll.click();
    completedLink.click();
    browser.takeScreenshot().then(function (png) {
      writeScreenShot(png, 'screenshots/screenshot-4.png');
    });
    expect(completedList.getText()).toContain(text);
    perf.stop();

    if (perf.isEnabled) {
      expect(perf.getStats('meanFrameTime')).toBeLessThan(30);
    }
  });

});