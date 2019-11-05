var e = require("./highlight");

e.registerLanguage("bash", require("./languages/bash")), e.registerLanguage("coffeescript", require("./languages/coffeescript")), 
e.registerLanguage("css", require("./languages/css")), e.registerLanguage("dns", require("./languages/dns")), 
e.registerLanguage("dos", require("./languages/dos")), e.registerLanguage("erlang", require("./languages/erlang")), 
e.registerLanguage("go", require("./languages/go")), e.registerLanguage("htmlbars", require("./languages/htmlbars")), 
e.registerLanguage("http", require("./languages/http")), e.registerLanguage("java", require("./languages/java")), 
e.registerLanguage("javascript", require("./languages/javascript")), e.registerLanguage("json", require("./languages/json")), 
e.registerLanguage("less", require("./languages/less")), e.registerLanguage("makefile", require("./languages/makefile")), 
e.registerLanguage("markdown", require("./languages/markdown")), e.registerLanguage("nginx", require("./languages/nginx")), 
e.registerLanguage("php", require("./languages/php")), e.registerLanguage("powershell", require("./languages/powershell")), 
e.registerLanguage("python", require("./languages/python")), e.registerLanguage("ruby", require("./languages/ruby")), 
e.registerLanguage("scss", require("./languages/scss")), e.registerLanguage("shell", require("./languages/shell")), 
e.registerLanguage("sql", require("./languages/sql")), e.registerLanguage("swift", require("./languages/swift")), 
e.registerLanguage("typescript", require("./languages/typescript")), module.exports = e;