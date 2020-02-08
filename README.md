Assuming that 3 points.

We can raise an event everyTime the `logError` is called with the `error` parameter.
This way we can separate the manual logging in the text file from the handling of the "counter".
Let's call this event __ERROR_THROW__, and that event should have the __ERROR_DATE__ in UTC.

We will register a handler for __ERROR_THROW__ so every time the event is emitted:
Let's assume that we've some sort of _store_ like 'Redis' (https://redis.io/).
That _store_ will have two variabls there:
- __ERRORS_COLLECTION__ (Date[])
- __APP_NOTIFYING__ (bool)

## Algorythm
- ADD __ERROR_DATE__ TO __ERRORS_COLLECTION__.
- QUERY __APP_NOTIFYING__.
  - IF __APP_NOTIFYING__ IS _false_:
    - QUERY __ERRORS_COLLECTION__.count() FROM _1 minute_ BEFORE TO __ERROR_DATE__. (*)
    - IF COUNT > _10_:
      - SET __APP_NOTIFYING__ TO _true_.
      - NOTIFY AND WAIT_FOR RESPONSE.
      - SET_TIMEOUT _1 minute_ TO:
        - SET __APP_NOTIFYING__ to _false_.
        - RUN FROM WITH NOW_DATE (*).

_This solution provides_:
  - Faster access to the information than reading the file.
  - Scalation alternative if the web application starts to run in multiple servers.