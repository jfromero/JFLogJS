# JFLogJS (MIT License)

JFLogJS library is a very little Javascript library that allows to make logging easier and better.

# Installation

Add this line to your script:

```html
<script src="JFLogging.js"></script>
```

NOTE: Change "src" attribute to the real script location.

# Logging

JFLogJS create the "LOG" global object to write logs in the JS console. This object has some attributes and methods very easy to use.

## Enabling and disabling Logging

Check the status:

```javascript
// It will return "enabled" or "disabled"
LOG.status
```

Enable logging:

```javascript
LOG.enable()
```

Disable logging:
```javascript
LOG.disable()
```

## Logging levels

Current logging level can be checked with:

```javascript
LOG.currentLevel
```

Allowed logging levels are:

- all
- debug
- info
- warning
- error
- critical
- no_messages (no messages are printed)

The principal feature of this library is to print only messages with a level equal or below than currentLevel.

To change current level, use any of these:

```javascript
LOG.setAllMessagesLevel()	// Change current Level to print all messages
LOG.setDebugLevel()		// Change current Level to debug
LOG.setInfoLevel()		// Change current Level to info
LOG.setWarningLevel() 	// Change current Level to warning
LOG.setErrorLevel()		// Change current Level to error
LOG.setCriticalLevel()	// Change current Level to critical
LOG.setNoMessagesLevel()	// Change current Level to No messages. No messages are printed
```

## Print messages

Use these commands to logging your messages. Only messages with a level equal or above to current level will be printed:

```javascript
LOG.all(message)
LOG.debug(message)
LOG.info(message)
LOG.warn(message)
LOG.error(message)
LOG.critical(message)
```

## Removing milliseconds from logging Date

By default milliseconds are removed from message. If you want to print them, use this command:

```javascript
LOG.removeMilSecDate = false	// show milliseconds on logging
LOG.removeMilSecDate = true		// remove milliseconds from logging
```

# Add onMessage events

You can add your custom functions every time a kind of message is printed. Execute:

```javascript
LOG.onMessage(msgType, func)
```

Allowed msgType are:

```javacript
LOG.level_all
LOG.level_debug
LOG.level_info
LOG.level_warning
LOG.level_error
LOG.level_critical
LOG.level_nomessages
```
