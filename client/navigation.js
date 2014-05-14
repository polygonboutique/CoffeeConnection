/**
 * Created by Thomas on 14.05.14.
 */

pageList = function(){
    this.list = [];
};

pageList.prototype.addPage = function(page)
{
    this.list.push(page);
    for(index = 0; index < pageList.length; ++index)
    {
        console.log(pageList[index]);
    }
};

function resetPageList()
{
    for(index = 0; index < pageList.length; ++index)
    {
        pageList.pop(pageList[index]);
    }
}