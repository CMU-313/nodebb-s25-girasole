'use strict';

module.exports = function (Topics) {
	Topics.searchByKeyword = async function (query) {
		const keyword = query.keyword || '';
		const initTopics = query.initTopics || null;

        if (initTopics) {
            const topicsByKeyword = initTopics.filter((topic) => {
                const title = topic.title.toLowerCase();
                return title.includes(keyword);
            });

            const searchResult = { topics: topicsByKeyword };
            return searchResult;
        }

        return { topics: initTopics };
	};
};
