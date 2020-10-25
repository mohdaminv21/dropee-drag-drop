const showLoading = () => {
    $('#loading').addClass('loading');
    $('#loading-content').addClass('loading-content');
}

const hideLoading = () => {
    setTimeout(()=> {
        $('#loading').removeClass('loading');
        $('#loading-content').removeClass('loading-content');
    }, 100)    
}

const saveDataset = (datasets, callback) => {
    const payload = prepareDataset(datasets);
    showLoading();
    
    $.ajax({
        url: '/set',
        type: "POST",
        async: false,
        dataType: 'json',
        data: payload,
        success: (res) => {
            hideLoading();
            callback(null, res);            
        },
        error: e => {
            hideLoading();
            callback(e, null);            
        }
    });
}

const prepareDataset = (datasets) => {
    let insert = [];
    let update = [];
    
    datasets.forEach(dataset => {
        if(dataset.text !== '') {
            const coordinate = dataset.coordinates.split('|');
            let data = {
                row: coordinate[0],
                column: coordinate[1],
                text: dataset.text,
                color: dataset.color,
                style: dataset.style
            };

            if(dataset.tableId) {  
                data.id = dataset.tableId;             
                update.push(data);
            }
            else {
                insert.push(data);
            }
        }
    });

    return {
        insert,
        update
    }
}

$(function() {
    let dataTables = [...tables];

    $('.grid-item').on('dragstart', e => {
        $('#'+e.currentTarget.id).addClass('dragging');
    })   

    $('.grid-item').on('drop', e => {        
        const $fromContainer = $('.dragging');
        // const targetId = document.elementFromPoint(e.clientX, e.clientY).id;
        // let $toContainer = $('#'+targetId);

        let $toContainer = $(e.currentTarget);
        
        if($toContainer[0].tagName !== 'DIV') {
            $toContainer = $toContainer.parent();
        }

        if($fromContainer[0].id !== $toContainer[0].id) {
            const fromElement = $fromContainer.children();
            const toElement = $toContainer.children();
            const fromKey = $fromContainer[0].dataset.key;
            const toKey = $toContainer[0].dataset.key; 
            const fromBg = $toContainer.css( "background-color" ) || toElement.css( "background" );
            const toBg = $fromContainer.css( "background-color" ) || fromElement.css( "background" );

            // Move element
            $fromContainer.append(toElement);
            $toContainer.append(fromElement);
            $fromContainer.css({'background-color': fromBg});
            $toContainer.css({'background-color': toBg});

            // Update json data
            let fromData = JSON.parse(JSON.stringify(dataTables[fromKey]));
            let toData = JSON.parse(JSON.stringify(dataTables[toKey]));
            fromData.coordinates = dataTables[toKey].coordinates;
            toData.coordinates = dataTables[fromKey].coordinates;
            dataTables[fromKey] = toData;
            dataTables[toKey] = fromData;
            
            saveDataset([dataTables[fromKey], dataTables[toKey]], (e, res) => {
                // Update tableId if insert                
            });
            
                                  
        }        
        $fromContainer.removeClass('dragging');  
    })

    $('.grid-container').on('dragover',  e => {
        e.preventDefault('dragover');
    });

    $('.grid-item').on('dblclick', e => {
        const key = e.currentTarget.dataset.key;
        const dataset = dataTables[key];
        
        $("#index").val(key);
        $("#tableId").val(dataset.tableId);
        $("#text").val(dataset.text);
        $("#color").val(dataset.color);
        $("#style").val(dataset.style);
        $('#edit-modal').modal();
    });

    $('#btnSave').on('click', e => {
        const key = $("#index").val();
        const tableId = $("#tableId").val();
        const text = $("#text").val();
        const color = $("#color").val();
        const style = $("#style").val();
        const $cell = $('#element'+key).find('p');
        
        // Validation to stop empty text
        if(text == '') {
            alert('Please insert text');
            return false;
        }        

        // Update page
        dataTables[key].tableId = tableId; // If newly updated dont forget to get back from db
        dataTables[key].text = text;
        dataTables[key].color = color;
        dataTables[key].style = style;

        let styles = {};

        if(color != '') {
            styles.color = color;
        }        

        if(style !== '') {
            arrStyle = style.split(';');
            arrStyle.forEach(s => {
                const itemStyle = s.split(":").map(function(item) {
                    return item.trim();
                });

                if(itemStyle[0] !== '') {
                    styles[itemStyle[0]] = itemStyle[1];

                    if(itemStyle[0] == 'background-color') {
                        $cell.parent().css({ 'background-color': itemStyle[1]});
                    }
                }
            });
        }
        else {
            $cell.parent().css({ 'background-color': '#e1e9f5'});
        }

        
        $cell.removeAttr("style");
        $cell.css(styles);
        $cell.html(text);

        // Do db save
        saveDataset([dataTables[key]], (e, res) => {
            if(res && res.createdId && res.createdId.length) {
                // Update tableId if insert
                dataTables[key].tableId = res.createdId[0];
            }            
        });

      })
});

