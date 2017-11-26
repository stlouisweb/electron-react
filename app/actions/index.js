const UPDATE_TEXT = 'UPDATE_TEXT';

function updateText(text) {
return { type: UPDATE_TEXT, text }
};

module.exports = { UPDATE_TEXT, updateText }
