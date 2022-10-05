import React from 'react'

const Header = (props) => {
  return (
    <div className="ui.fixed.menu">
        <div className="ui header">
            <h2>Contacts List Manager</h2>
            <div>
              <div className="ui massive icon input">
                <input type="text" placeholder="Search Contact..." onChange={props.searchHandler}/>
                <i className="search icon"></i>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Header