### Database structure

```json
{
    permissions: {
        uid-1: {
            admin: true
        }
    },
    planning: {
        estimates: {
            uid-1: 8,
            uid-2: 10 
        }
        sprint: 1,
        task: "DP-1"
    },
    users: [
        uid-1: {
            inSprint: true,
            name: 'James Baxter',
            md5: 'b79fcb452a36f38148fc974d4f98ccb1'
        }, 
        uid-2: {
            inSprint: true,
            name: 'Matthew Forrest',
            md5: 'e42d0c4819b96bb18b74b6088d3336b9'
        }
    ]
}
```