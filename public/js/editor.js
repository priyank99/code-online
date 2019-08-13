var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");

$("#submitBtn").on('click', function () {
    $.post("/tools/format", {
            code: editor.getSession().getValue(),
            style: $('#styleSelect').val()
        },
        function (data) {
            console.log(data);
            editor.setValue(data, 1);
        });
});

editor.session.setTabSize(4);
editor.setOptions({
    highlightActiveLine: true,
    highlightSelectedWord: true,
    autoScrollEditorIntoView: true,
    fontSize: "1rem",
    fontFamily: "monospace, consolas",
    useSoftTabs: true,
    navigateWithinSoftTabs: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    mode: 'ace/mode/c_cpp'
})