import React from 'react';
import _ from 'lodash';
import { Icon, Menu } from 'semantic-ui-react';
const MenuItem = (props) => {
    return(
        <Menu.Item onClick={() => props.selectCategory(props.cat)}> 
            { props.CategoryName }
        </Menu.Item>
    );
}

const PageButton = (props) =>{
    if((props.page > 1 && props.page < props.pages) || props.list === 'false'){
        return(
            <Menu.Item onClick={() => props.selectPage(props.page)}> {props.page} </Menu.Item>
        );
    }
    else{
        return(null);
    }

}

const MyMenu = (props) => {
    return(
<div>        
    <Menu inverted fluid widths={5} size="massive">
        <MenuItem cat="all" CategoryName="Wszystko" selectCategory={props.selectCategory}/>            
        <MenuItem cat="cameras" CategoryName="Kamery" selectCategory={props.selectCategory} />            
        <MenuItem cat="tvs" CategoryName="TV" selectCategory={props.selectCategory} />            
        <MenuItem cat="computers" CategoryName="Komputery" selectCategory={props.selectCategory} />            
        <MenuItem cat="phones" CategoryName="Telefony" selectCategory={props.selectCategory} />
    </Menu> 
   
    <Menu inverted fluid widths={9}>
        <Menu.Item  onClick={props.previousPage}> <Icon name="angle double left" /> </Menu.Item>
        <PageButton selectPage={props.selectPage}  list='false' page={1} />
        {props.maxPages > 2 && _.range(props.page-1,parseInt(props.page,10)+2).map(i => <PageButton selectPage={props.selectPage} list='true' key={i} page={i} pages={props.maxPages} /> )}
        {props.maxPages > 1 &&<PageButton selectPage={props.selectPage}  list='false' page={props.maxPages} />}
        <Menu.Item  onClick={props.nextPage}> <Icon name="angle double right" /> </Menu.Item>
    </Menu>
    </div>
    );
}

export default MyMenu;