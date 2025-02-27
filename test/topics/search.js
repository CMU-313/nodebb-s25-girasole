'use strict';

const assert = require('assert');

const categories = require('../../src/categories');
const topics = require('../../src/topics');
const user = require('../../src/user');

describe('Topic Search', () => {
	let fooUid;
	let topic1;
	let topic2;
	let topic3;

	before(async () => {
		fooUid = await user.create({ username: 'foo', password: '123456' });

		topic1 = await topics.post({
			title: 'Welcome to NodeBB!',
			content: 'We hope you have fun!',
			uid: fooUid,
			cid: 1,
		});
		topic2 = await topics.post({
			title: 'Come to Office Hours today',
			content: 'OH will be held in Gates from 3-4.',
			uid: fooUid,
			cid: 1,
		});
		topic3 = await topics.post({
			title: 'When will homework be posted today?',
			content: 'Just wondering what time homework will be posted.',
			uid: fooUid,
			cid: 1,
		});
	});

	it('should return topics containing the keyword in the title', async () => {
		const query = { keyword: 'come', initTopics: [topic1.topicData, topic2.topicData, topic3.topicData] };
		const result = await topics.searchByKeyword(query);

		assert.strictEqual(result.topics.length, 2);
		assert.strictEqual(result.topics[0].title, 'Welcome to NodeBB!');
		assert.strictEqual(result.topics[1].title, 'Come to Office Hours today');
	});

	it('should return empty array if no topic titles match the keyword', async () => {
		const query = { keyword: 'x', initTopics: [topic1.topicData, topic2.topicData, topic3.topicData] };
		const result = await topics.searchByKeyword(query);

		assert.strictEqual(result.topics.length, 0);
	});

	it('should return empty array if there are no topics to search from', async () => {
		const query = { keyword: 'come', initTopics: [] };
		const result = await topics.searchByKeyword(query);

		assert.strictEqual(result.topics.length, 0);
	});

	it('should return all topics if keyword is an empty string', async () => {
		const query = { keyword: '', initTopics: [topic1.topicData, topic2.topicData, topic3.topicData] };
		const result = await topics.searchByKeyword(query);

		assert.strictEqual(result.topics.length, 3);
		assert.strictEqual(result.topics[0].title, 'Welcome to NodeBB!');
		assert.strictEqual(result.topics[1].title, 'Come to Office Hours today');
		assert.strictEqual(result.topics[2].title, 'When will homework be posted today?');
	});

	it('should not handle search keywords using a case-sensitive approach', async () => {
		const query = { keyword: 'nodebb', initTopics: [topic1.topicData, topic2.topicData, topic3.topicData] };
		const result = await topics.searchByKeyword(query);

		assert.strictEqual(result.topics.length, 1);
		assert.strictEqual(result.topics[0].title, 'Welcome to NodeBB!');
	});

	it('should return topics containing partial keyword matches', async () => {
		const query = { keyword: 'to', initTopics: [topic1.topicData, topic2.topicData, topic3.topicData] };
		const result = await topics.searchByKeyword(query);

		assert.strictEqual(result.topics.length, 3);
		assert.strictEqual(result.topics[0].title, 'Welcome to NodeBB!');
		assert.strictEqual(result.topics[1].title, 'Come to Office Hours today');
		assert.strictEqual(result.topics[2].title, 'When will homework be posted today?');
	});
});
