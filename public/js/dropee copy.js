$(function() {

    const draggables = document.querySelectorAll('.grid-item'); 
    const containers = document.querySelectorAll('.grid-container');
    let dataTables = [...tables];

    const showLoading = () => {
        document.querySelector('#loading').classList.add('loading');
        document.querySelector('#loading-content').classList.add('loading-content');
    }

    const hideLoading = () => {
        document.querySelector('#loading').classList.remove('loading');
        document.querySelector('#loading-content').classList.remove('loading-content');
    }

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', e => {
            e.dataTransfer.effectAllowed = "copyMove";
            draggable.classList.add('dragging')
        })
        
        draggable.addEventListener('dragend', e => {
            const fromContainer = document.querySelector('.dragging');
            let toContainer = document.elementFromPoint(e.clientX, e.clientY);// 

            if(toContainer.tagName !== "DIV") {
                toContainer = toContainer.parentNode;
            }
            console.log('toContainer>>', toContainer);
            if(fromContainer !== toContainer && toContainer.classList.contains('grid-item')) {
                const fromElement = fromContainer.firstChild;
                const toElement = toContainer.firstChild;
                const fromKey = fromContainer.dataset.key;
                const toKey = toContainer.dataset.key;            
                let fromData = JSON.parse(JSON.stringify(dataTables[fromKey]));
                let toData = JSON.parse(JSON.stringify(dataTables[toKey]));  
                fromData.coordinates = dataTables[toKey].coordinates;
                toData.coordinates = dataTables[fromKey].coordinates;
                fromContainer.appendChild(toElement);
                toContainer.appendChild(fromElement);
                dataTables[fromKey] = toData;
                dataTables[toKey] = fromData;

                let dataset = [toData, fromData];

                // should call ajax to save here

                console.log(dataset);        
                console.log('dataTables>>', dataTables);
                // console.log('from>>', fromElement.dataset );
                // console.log('to>>', toElement.dataset );
            }
            draggable.classList.remove('dragging');
        })
    })
        
    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
        })
    })
});

