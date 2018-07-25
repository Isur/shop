import React from 'react';
import _ from 'lodash';
import { Icon, Menu } from 'semantic-ui-react';

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


const PaginationMenu = (props) => {
    return(
        <Menu inverted fluid widths={9}>
            <Menu.Item  onClick={props.previousPage}> 
                <Icon name="angle double left" /> 
            </Menu.Item>
            <PageButton selectPage={props.selectPage}  list='false' page={1} />
            
            {props.maxPages > 2 && _.range(props.page-2,parseInt(props.page,10)+3).map(i => 
                <PageButton selectPage={props.selectPage} list='true' key={i} page={i} pages={props.maxPages} /> 
            )}
            {props.maxPages > 1 &&<PageButton selectPage={props.selectPage}  list='false' page={props.maxPages} />}
            <Menu.Item  onClick={props.nextPage}> 
                <Icon name="angle double right" /> 
            </Menu.Item>
        </Menu>
    );
}

export default PaginationMenu;