const Language = Object.freeze({
    C: 'c',
    Cpp: 'cpp',
    Py3: 'python3',
    Js: 'javascript',
    Java: 'java',

});

function multiline_HTML(arr) {
    htmlString = "";
    for(let i = 0; i < arr.length; i++){
        if(arr[i]=='\n')
          htmlString += "<br/>";
        else{
            htmlString += arr[i];
        }
    }
    return htmlString
}

$("#langSelect").change(function () {
    var lang = this.value;
    switch(lang){
        case Language.Cpp:
            editor.setOptions({
                mode: 'ace/mode/c_cpp'
            });
            break;
        case Language.Py3:
            editor.setOptions({
                mode: 'ace/mode/python'
            })
            break;
        default:
            editor.setOptions({
                mode: 'ace/mode/c_cpp'
            });
            break;
    }

});

$("#runBtn").on('click', function () {
    $("#status-box").html(" Running.. "); 
    $("#output-text").html(""); 
    $("#time-box").html("");
    const url = "/api/run/";
    
    $.post(url, {
            code: editor.getSession().getValue(),
            language: $('#langSelect').val()
        },
        function (data) {
            console.log(data);
            if(data.err != '0'){
                $("#status-box").html(data.err + "<br/> "); 
                $("#output-text").html(data.stderr); 
            }
            else{
                $("#status-box").html(data.status + "<br/> "); 
                $("#output-text").html( multiline_HTML(data.stdout) ); 
                $("#time-box").html("Time: " + data.time +" s <br/> "); 
            }
        }
    );
});
$("#shareBtn").on('click', function () {
    $("#link-text").html("Saving.. "); 
    const api_url = "/api/share/code";
    
    $.post(api_url, {
            code_text: editor.getSession().getValue(),
            language: $('#langSelect').val()
        },
        function (data) {
            console.log(data);
            if(data.url != null){
                let page_url = window.location.origin +'/shared/'+ data.url;

                $("#link-text").html(`<a href=${page_url}>${page_url}</a>`); 
                $("#link-box").show();
            }
            else{
                $("#link-text").html('Some error occurred'); 
            }
        });
});
