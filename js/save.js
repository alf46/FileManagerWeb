$(document).ready(function () {
    $('#frm-save').submit(function (event) {

        // Obtener el nombre del archivo.
        var filename = $('#txtfilename').val();

        // Obtener el formato del archivo.
        var format = $('#cbxformat').children("option:selected").val();

        // Obtener los datos.
        var textData = $('#textData').val();

        if (filename != '' && format != '' && textData != '') {
            var blob = new Blob([textData], { type: 'text/plain;charset=utf-8' });
            saveAs(blob, filename + '.' + format);
        }

        event.preventDefault();
    });

    $('#btnjsondata').click(function () {
        try {
            $.ajax({
                url: "http://dummy.restapiexample.com/api/v1/employees",
                type: "GET",
                dataType: 'json',
                error: function (xhr, text, status) {
                    alert("Error obteniendo los datos: " + xhr + ", " + text + ", status=" + status);
                },
                success: function (result) {
                    alert(JSON.stringify(result));
                }
            });
        } catch (e) {
            alert("Error: " + e.toString());
        }
    });
});