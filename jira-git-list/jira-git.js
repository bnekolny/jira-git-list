    var branches = [], suez_branches = [],
        dashboards =    ["Filter Results: Ready for Staging QA",
                        "Filter Results: Ready for Code Review",
                        "Filter Results: Ready for Production Deployment"];
                        
    $('h3.dashboard-item-title').each(function(){
        if( $.inArray( $(this).text(), dashboards ) > -1){
            $(this).parents('.dashboard-item-header').next('.dashboard-item-content').find('iframe').contents().find('tr.issuerow').each(function(){
                var row = $(this),
                subsystem = row.find('.customfield_10080 .labels').text().trim();

                if(subsystem === "None" || subsystem.search('panama') > -1 ){
                    branches.push(row.attr('data-issuekey'));
                }
                else if(subsystem.search('suez') > -1){
                    suez_branches.push(row.attr('data-issuekey'));
                }
            });
        } // if
    }); // each
    
    if( branches.length || suez_branches.length){
        if(branches.length){
            var string = 'git merge ';
            for(var i=0; i<branches.length; i++){
                string += ' origin/' + branches[i];
            }
        }
        if(suez_branches.length){
            var suez_string = 'git merge ';
            for(var i=0; i<suez_branches.length; i++){
                suez_string += ' origin/' + suez_branches[i];
            }
        }
        if(suez_branches.length){
            alert("for panama\n" + string + "\n\nfor suez\n" + suez_string);
        }
        else{
            prompt('for panama', string);
        }
    }
    else {
        alert('No Branches');
    }
    