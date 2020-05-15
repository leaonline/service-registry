// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by service-registry.js.
import { name as packageName } from "meteor/leaonline:service-registry";

// Write your tests here!
// Here is an example.
Tinytest.add('service-registry - example', function (test) {
  test.equal(packageName, "service-registry");
});
