import React from 'react';
import { useState } from 'react';

export default function Strength({name}) {

    return(
        // this will contain the name, description, means to edit, delete, and select for execution
        <div>
            {name}
        </div>
    );
}