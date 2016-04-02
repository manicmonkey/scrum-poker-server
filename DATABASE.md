### Database structure

```json
{
    users: [{
            email: 'jbaxter@efstechnology.com',
            name: 'James',
            md5: 'b79fcb452a36f38148fc974d4f98ccb1'
        }, {
            email: 'c2.forrest@gmail.com',
            name: 'Matt',
            md5: 'e42d0c4819b96bb18b74b6088d3336b9'
        }
    ],
    currentSprint: {
        version: 3,
        developers: ['jbaxter@efstechnology.com', 'c2.forrest@gmail.com'],
        workingDays: 9.5,
        holidays: 2
    },
    planning: {
        task: "DP-1",
        developers: [{
                email: 'jbaxter@efstechnology.com',
                estimate: 2
            }, {
                email: 'c2.forrest@gmail.com',
                estmate: 3
            }
        ]
    },
    sprints: [{
            version: 2,
            attendees: ["jbaxter@efstechnology.com", "c2.forrest@gmail.com", "lewisj@efstechnology.com"],
            workingDays: 9,
            holidays: 1
        },
        {
            version: 1,
            attendees: ["jbaxter@efstechnology.com", "c2.forrest@gmail.com", "mattf@efstechnology.com"],
            workingDays: 9.5,
            holidays: 4
        }
    ]
}
```