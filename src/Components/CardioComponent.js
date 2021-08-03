import React from 'react';
import { useState } from 'react';

export default function Cardio({cArray}) {
    return(
        cArray.map((exercise) => {
            return(
                <div>
                    {exercise.eName}
                </div>
            );
        })
    );
}