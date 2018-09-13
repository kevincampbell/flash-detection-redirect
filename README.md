# flash-detection-redirect

### Deployment

Manually increment version and copy **flash-detection-redirect.min.js** to the deployment repository (automation coming soon!):

**dev** branch of https://github.com/NBCUOTS/player.common.vod
Once changes are pushed to origin/dev, automation will deploy here:
https://s3-us-west-2.amazonaws.com/tverationalplayer-dev/player/common/vod/.3.5/js/flash-detection-redirect.min.js

To deploy to stage, open a new pull request.

# Unit Tests
Unit testing with Jest as recommended by https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2018-f68950900bc3. The best place to start learning how to test with Jest is from the Jest website at https://facebook.github.io/jest/.

## Installation
There are several ways to download / configure / run the tests, but this repo is configured to use [`npm`](https://www.npmjs.com/get-npm):

```bash
npm install
```

Then you can run the test from this directory with:

```bash
npm test --coverage
```

## Writing Your Own Tests
In the unit_test directory, there is the example [sum.js](./unit_tests/sum.js) and [sum.test.js](./unit_tests/sum.test.js) from https://facebook.github.io/jest/docs/en/getting-started.html. There is also a starter [template](./unit_tests/template.test.example). Simply copy the contents of the template to a new file ending in ` .test.js ` and the test runner will detect and run it automatically.

The [stubs.js](./unit_tests/stubs.js) file contains stub code that will allow the heartbeat code to run without failing, but you will probably want to overwrite many of those implementations with proper mock objects, which you can learn about from the Jest website or stackoverflow or google.

Happy testing!