export function SavedQueries(params) {
  
    function onSavedQueryClick(savedQuery){
      params.onQuerySelect(savedQuery);
    }
  
    function getQueries() {
      return params.savedQueries.map((item, idx) => {
        let trimTitle = item.queryName.substring(0, 30);
        return (<li style={{ cursor: 'pointer'}}
          key={idx} 
          onClick={()=>onSavedQueryClick(item)} 
          className={(item.queryName === params.selectedQueryName)?"selected":""}
        >{trimTitle + ": \"" + item.q + "\""} </li>);
      })
    }
    
    function onResetClick(event) {
      event.preventDefault();
      
      const confirmDelete = window.confirm("Are you sure you want to erase the query list?");

      if (confirmDelete) {
        params.deleteQueryList()
      } else {
        return;
      }
    };

    function currentUserIsAdmin(){
      if(params.currentUser){
          if(params.currentUser.user){
              if(params.currentUser.user === "admin"){
                  return true;
              }
          }
      }
      return false;
  }
  
    return (
        <div>
          <ul >{
            (params.savedQueries && params.savedQueries.length > 0)
            ? getQueries()
            : <li>No Saved Queries, Yet!</li>
          }</ul>
          <span className={currentUserIsAdmin() ? "block visible":"hidden"} style={{  backgroundColor: "#eee" }}>
            <input type="button" value="Reset" onClick={onResetClick} />
          </span>
        </div>
      )
    
    }