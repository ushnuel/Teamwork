"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Article = function Article() {
  _classCallCheck(this, Article);

  this.article = {
    title: 'How to improve employee relationships',
    article: '1. ASK FOR INPUT 2. COMMUNICATE THE COMPANY MISSION AND VISION 3. RECOGNIZE A JOB WELL DONE 4. PROMOTE WORK-LIFE BALANCE 5. OFFER CAREER DEVELOPMENT OPPORTUNITIES'
  };
  this.editedArticle = {
    title: 'How to build a good working environment',
    article: 'I have edited this article now'
  };
};

exports["default"] = Article;