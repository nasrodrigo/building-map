import React, { useState } from 'react';
import Person from './Person/Person'

const app = promps => {
    const [personsState] = useState(
        {
            persons: [
                {name:"Rodrigo", age:"36"},
                {name:"Sofia", age:"9"},
                {name:"Patricia", age:"34"}
            ]
        }
    );

    
    return ( personsState.persons.map( p => <Person name={p.name} age={p.age}/> ));
    
}

export default app;