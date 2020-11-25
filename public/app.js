$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
    var Delta = Quill.import('delta')
    var quill = new Quill('#editor', {
    placeholder: 'Write your notes...',
    theme: 'snow'
    });

    var change = new Delta()
    quill.on('text-change', function(delta){
        change = change.compose(delta)
    })

    $('#save').on('click', function () {
        console.log('Saving', change)
            $.post('/newnote',{
                title: $("#title").val().trim(),
                doc: JSON.stringify(quill.getContents())

            })
            change = new Delta();
            
       
    })

    window.onbeforeunload = function() {
        if (change.length() > 0) {
        return 'There are unsaved changes. Are you sure you want to leave?';
        }
    }

    $.get('/note', function(data){
       
    for(i=0; i < data.data.length; i++) {
       $('.saved').append(`<li><a id="${data.data[i].title.trim()}" href="#">${data.data[i].title}</a></li>`)
       $(`#${data.data[i].title}`).on('click', function(){
           for(i=0; i < data.data.length; i++) {
               console.log(data.data[i].doc)
               quill.setContents(JSON.parse(data.data[i].doc));
           }
        
        
       })
        } 
    
    })
    
});