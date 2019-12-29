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
        case 'cpp':
            editor.setOptions({
                mode: 'ace/mode/c_cpp'
            });
            break;
        case 'py':
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
    $("#output-box").html(""); 
    $("#time-box").html("");
    let url = "/run/cpp" 
    if($('#langSelect').val() == "py"){
        url = "/run/py";
    }
    else if($('#langSelect').val() == "cpp"){
        url = "/run/cpp";
    }

    $.post(url, {
            code: editor.getSession().getValue(),
        },
        function (data) {
            console.log(data);
            if(data.err != '0'){
                $("#status-box").html(data.err + "<br/> "); 
                $("#output-box").html(data.stderr); 
            }
            else{
                $("#status-box").html(data.status + "<br/> "); 
                $("#output-box").html("<pre>" + multiline_HTML(data.stdout) +"</pre>" ); 
                $("#time-box").html("Time: " + data.time +" s <br/> "); 
            }
        });
});
