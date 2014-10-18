var Lab = require('lab'),
    lab = exports.lab = Lab.script(),
    describe = lab.experiment,
    before = lab.before,
    after = lab.after,
    it = lab.test,
    expect = Lab.expect,
    present = require(__dirname + "/../../presenters/user"),
    users = require(__dirname + "/../fixtures/users")


describe("meta", function () {

  it("is an object with key-value pairs", function(done){
    var user = present(users.full_meta)
    expect(user.meta).to.exist
    expect(user.meta).to.be.an("Object")
    done()
  })

  it("removes meta pairs with empty values", function(done){
    var user = present({
      name: "mona",
      fields: [
        {name: "github", value: "mona"},
        {name: "twitter", value: "mona"},
        {name: "", value: "mona"},
        {name: "ICQ", value: ""}
      ]
    })
    expect(Object.keys(user.meta)).to.have.length(2)
    expect(user.meta.github).to.exist
    expect(user.meta.twitter).to.exist
    done()
  })

  describe("github", function () {

    it("removes leading @ from username if present", function(done){
      var user = present({
        name: "eleanor",
        fields: [
          {name: "github", value: "@eleanor"},
        ]
      })
      expect(user.meta.github).to.equal("eleanor")
      done()
    })

    it("extracts username if value is a URL", function(done){
      var user = present({
        name: "suzan",
        fields: [
          {name: "github", value: "https://github.com/suzan"},
        ]
      })
      expect(user.meta.github).to.equal("suzan")
      done()
    })

    it("extracts username if value is a schemeless URL", function(done){
      var user = present({
        name: "jimbo",
        fields: [
          {name: "github", value: "github.com/jimbo"},
        ]
      })
      expect(user.meta.github).to.equal("jimbo")
      done()
    })

  })

  describe("twitter", function () {

    it("removes leading @ from username if present", function(done){
      var user = present({
        name: "eleanor",
        fields: [
          {name: "twitter", value: "@eleanor"},
        ]
      })
      expect(user.meta.twitter).to.equal("eleanor")
      done()
    })

    it("extracts username if value is a URL", function(done){
      var user = present({
        name: "suzan",
        fields: [
          {name: "twitter", value: "https://twitter.com/suzan"},
        ]
      })
      expect(user.meta.twitter).to.equal("suzan")
      done()
    })

    it("extracts username if value is a schemeless URL", function(done){
      var user = present({
        name: "suzan",
        fields: [
          {name: "twitter", value: "twitter.com/suzan"},
        ]
      })
      expect(user.meta.twitter).to.equal("suzan")
      done()
    })

  })
})
