export function Articles(params) {
    let articles = (params.data.articles)?params.data.articles:[];
    let queryName = (params.query.queryName)?params.query.queryName:"na";
    let articleCount = (params.data.totalResults)?params.data.totalResults:0;
    let query = (params.query.q)?params.query.q:[];
    let lang = (params.query.language)?params.query.language:"";
    let size = (params.query.pageSize)?params.query.pageSize:0;

    // https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings
    function truncate( str, n, useWordBoundary ){
      if (str.length <= n) { return str; }
      const subString = str.slice(0, n-1); // the original check
      return (useWordBoundary 
        ? subString.slice(0, subString.lastIndexOf(" ")) 
        : subString) + "&hellip;";
    };

    function onDetailsClick(event) {
      event.preventDefault();
      const detailsList = document.getElementById('detailsList');

      if (detailsList.style.display === 'none') {
        detailsList.style.display = 'block';
      } else {
        detailsList.style.display = 'none';
      }
    };

    return (
      <div style={{height:200 , overflow:"auto"}} >
        Query: {queryName}
        <br/>Count: {articleCount}<br/>
        <div>
          <input type="button" value="Details: " onClick={onDetailsClick} /> 
          <ul id="detailsList">
            <li>Search text: {query}</li>
            <li>Language: {lang}</li>
            <li>Page Limit: {size}</li>
          </ul>
        </div>
        <ol >{
            articles.map((item, idx) => {
              if(item){
                if(item.title){
                  if(item.title === "[Removed]"){
                    return (<li key={idx} >Was Removed</li>);
                  }
                  let trimTitle = truncate(item.title, 90);
                  return (<li key={idx}><a href={item.url} target="_blank" rel="noreferrer" >{trimTitle}</a></li>);    
                }else{
                  return (<li key={idx}>No Title</li>);
                }
              }else{
                return (<li key={1} >No Item</li>);
              }
            })
        }</ol>
      </div>
    )
  
  }