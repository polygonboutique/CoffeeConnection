/**
 * Created by Thomas on 14.05.14.
 * Edit: Sergej
 */

var PageListing = function(){};
PageListing.prototype.list = [];

PageListing.prototype.addPage = function(page)
{
    console.log("push page " + page);
    var i = PageListing.prototype.list.length; // current length
    PageListing.prototype.list[i] = page;
};

PageListing.prototype.resetPageList = function()
{
    PageListing.prototype.list = [];
};

pageList = new PageListing();