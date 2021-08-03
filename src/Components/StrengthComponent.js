import React from 'react';
import { useState } from 'react';

export default function Strength({sArray}) {
    return(
        sArray.map((exercise) => {
        return(
            <div>
                {exercise.eName}
            </div>
        );
    })
    );
}