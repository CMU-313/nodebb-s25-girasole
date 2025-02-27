'use strict';

const hooks = require.main.require('./src/plugins/hooks');

hooks.on('filter:composer.postData', async (hookData) => {
	if (hookData.data && hookData.data.anonymous) {
		console.log('[DEBUG] Anonymizing post data on server...');
		// Override the user data to post anonymously
		hookData.data.uid = 0;
		hookData.data.username = 'Anonymous';
		hookData.data.picture = '/assets/img/anonymous.png'; // Optional avatar
	}
	return hookData;
});
