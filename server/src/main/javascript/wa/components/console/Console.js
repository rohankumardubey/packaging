/*
 * Copyright (c) 2002-2011 "Neo Technology,"
 * Network Engine for Objects in Lund AB [http://neotechnology.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

wa.components.console.Console = (function($) {
    
    var me = {};
    
    me.basePage = $("<div></div>");
    me.ui = {};
    
    me.uiLoaded  = false;
    
    me.visible = false;
    
    me.consoleElement = null;
    
    me.history = [];
    me.currentHistoryIndex = -1;
    
    function getConsole() {
        return wa.Servers.getCurrentServer().manage.console;
    }
    
    //
    // PUBLIC
    //
    
    me.api = {
            
            getPage :  function() {
                return me.basePage;
            },
            
            pageChanged : function(ev) {
                
                if(ev.data === "console") {
                    
                    me.visible = true;
                    
                    if( me.uiLoaded === false ) {
                        me.uiLoaded = true;
                        me.basePage.setTemplateURL("templates/components/console/index.tp");
                        me.render();
                    }
                    
                    me.focusOnInputElement();
                    
                } else {
                    me.visible = false;
                }
            },
            
            /**
             * Send a console command up to the server to be evaluated.
             * 
             * @param statement
             *            is the statement string
             * @param cb
             *            (optional) callback that is called with the result
             *            object. If this is not specified, the result will be
             *            printed to the console.
             */
            evaluate : function(statement, cb) {
                var cb = cb || me.evalCallback;
                
                me.writeConsoleLine(statement, null, "console-input");
                
                if( statement.length > 0) {
                    me.api.pushHistory(me.consoleInput.val());
                }
                
                me.hideInput();
                
                getConsole().exec(statement, "awesome", (function(statement, cb) {
                    return function(data) {
                        cb(statement, data);
                        me.showInput();
                    };
                })(statement, cb));
                
            },
            
            init : function() {

            },
            
            pushHistory : function(cmd) {
                me.history.push(cmd);
                me.currentHistoryIndex = me.history.length - 1;
            },
            
            prevHistory : function() {
                if( me.currentHistoryIndex >= 0 && me.history.length > me.currentHistoryIndex ) {
                    me.currentHistoryIndex--;
                    return me.history[me.currentHistoryIndex + 1];
                } else if (me.history.length > 0) {
                    return me.history[0];
                } else {
                    return "";
                }
            },
            
            nextHistory : function() {
                if( me.history.length > (me.currentHistoryIndex + 1) ) {
                    me.currentHistoryIndex++;
                    return me.history[me.currentHistoryIndex];
                } else {
                    return "";
                }
            }
            
    };
    
    // 
    // PRIVATE
    //
    
    me.render = function() {
        
        me.basePage.processTemplate({
            server : me.server
        });
        
        me.consoleWrap      = $(".mor_console_wrap");
        me.consoleElement   = $("#mor_console");
        me.consoleInputWrap = $("#mor_console_input_wrap");
        me.consoleInput     = $("#mor_console_input");
        
    };
    
    me.hideInput = function() {
    	$("#mor_console_input").hide();
    };
    
    me.showInput = function() {
    	$("#mor_console_input").show();
    };
    
    me.focusOnInputElement = function() {
    	$("#mor_console_input").focus();
    };
    
    /**
     * Default callback for evaluated console statements. Prints the result to
     * the ui console.
     */
    me.evalCallback = function(originalStatement, data) {
        me.writeConsoleLine(data, '');
    };
    
    me.writeConsoleLine = function(line, prepend, clazz) {
        var prepend = prepend || "&gt; ";
        var clazz = clazz || "";
        me.consoleInputWrap.before($("<p> " + prepend + wa.htmlEscape(line) + "</p>").addClass(clazz));
        me.consoleWrap[0].scrollTop = me.consoleWrap[0].scrollHeight;
    };
    
    //
    // CONSTRUCT
    //
    
    /**
     * Look for enter-key press on input field.
     */
    $("#mor_console_input").live("keyup", function(ev) {
        if( ev.keyCode === 13 ) { // ENTER
            me.api.evaluate(me.consoleInput.val());
            me.consoleInput.val("");
        } else if (ev.keyCode === 38) { // UP
            me.consoleInput.val(me.api.prevHistory());
        } else if (ev.keyCode === 40) { // DOWN
            me.consoleInput.val(me.api.nextHistory());
        }
    });
    
    $("#mor_console").live("click", function(ev) {
    	if(ev.target.id === "mor_console") {
    		me.focusOnInputElement();
    	}
    });
    
    return me.api;
    
})(jQuery);

//
// REGISTER STUFF
//

wa.ui.Pages.add("console",wa.components.console.Console);
wa.ui.MainMenu.add({ label : "Console", pageKey:"console", index:2, requiredServices:['console'], perspectives:['server']});

wa.bind("ui.page.changed", wa.components.console.Console.pageChanged);