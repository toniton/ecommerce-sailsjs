# paytron

a [Sails](http://sailsjs.org) application

$ mkdir webapp
$ cd webapp
$ git init
$ echo "My webapp" > README.md
$ git add .
$ git commit -m "Initial commit"

# Here's the important part
# Do not forget the ending slash (/) in the prefix
# Also do not forget the "--squash" flag, otherwise you will
# end up with a very polluted Git history
$ git remote add server https://toniton@bitbucket.org/toniton/paytron-api.git
$ git subtree add --squash --prefix=server/ server master

$ git subtree pull --squash --prefix=server/ server master

$ echo "Imagine this is a bug fix" > server/README.md
$ git add .
$ git commit -m "server: fix #123"
$ git subtree push --prefix=server/ aws master
$ git subtree push --prefix=server/ server master
