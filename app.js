var webdriverio = require('webdriverio');
var prompt = require('prompt');
var schema = { properties: {
    username: { required: true },
    password: { hidden: true }
  }};

var options = { desiredCapabilities: { browserName: 'firefox' } };
var client = webdriverio.remote(options);

prompt.get(schema, function (err, result) {
  client
    .init()
    .url('https://www.firsthandfoundation.org/wp-admin/admin.php?page=payroll')
    .click('input[name=wp-submit]')
    .waitForExist('input#authUsername', 10000)
    .setValue('input#authUsername', result.username)
    .setValue('input#authPassword', result.password)
    .click('input#login')
    .waitForExist('select[name=freq]', 10000)
    .selectByValue('select[name=freq]', 'O')
    .selectByValue('select[name=cat]', 'F')
    .selectByValue('select[name=curr]', 'USD')
    .selectByValue('select[name=amt]', '5.00')
    .click('input#submit')
    .alertText( function( err, res ) {
      if ( res != null )
        this.alertAccept()
    })
    .pause(10000)
    .end()
});
