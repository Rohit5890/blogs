import React from 'react';

const TitleHeader = (props)=><header className={props.className}>
    <props.element >{props.title}</props.element>
    <hr/>
</header>;

export default TitleHeader;
