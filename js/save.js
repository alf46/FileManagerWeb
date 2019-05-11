$(document).ready(function () {

    $('#frm-save').submit(function (event) {

        // Obtener el nombre del archivo.
        var filename = $('#txtfilename').val();

        // Obtener el formato del archivo.
        var format = $('#cbxformat').children("option:selected").val();

        // Obtener los datos.
        var textData = $('#textData').val();

        if (filename != '' && format != '' && textData != '') {

            saveFileData(textData, filename, format);
        }

        event.preventDefault();
    });

    $('#btnjsondata').click(function () {
        try {
            $.ajax({
                url: "https://jsonplaceholder.typicode.com/users",
                type: "GET",
                dataType: 'json',
                error: function (xhr, text, status) {
                    alert("Error obteniendo los datos: " + xhr + ", " + text + ", status=" + status);
                },
                success: function (response) {
                   createtable(response);
                }
            });
        } catch (e) {
            alert("Error: " + e.toString());
        }
    });

    $('#btnxmldata').click(function(){
        var table = document.getElementById("tbdata");
        var xml = '<?xml version="1.0" encoding="UTF-8" ?><Users>';

        for (var i = 1; i < table.rows.length; i++) {
            xml += '<User>';
            for(var j = 0; j < table.rows[i].cells.length; j++){
                 var col = table.rows[0].cells[j].innerText;
                 var val = table.rows[i].cells[j].innerText;
                xml += '<'+col+'>'+ val+'</'+col+'>';
            }
            xml += '</User>';
        }
        xml += '</Users>';

        saveFileData(xml, 'UsersXmlData','xml');
    });

    function saveFileData(data, filename, formatFile){
        var blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, filename + '.' + formatFile);
    }

    function createtable(response){

        var html ='<table id="tbdata" class="table table-sm">'+
                  '<thead>'+
                  '<tr>'+
                  '<th scope="col">ID</th>'+
                  '<th scope="col">Name</th>'+
                  '<th scope="col">Username</th>'+
                  '<th scope="col">Email</th>'+
                  '</tr>'+
                  '</thead>'+
                  '<tbody>';

            $.each(response, function (i, item) {

                html +='<tr>';
                html +='<th scope="row">' + item.id + '</th>';
                html +='<td>' + item.name + '</td>';
                html +='<td>' + item.username + '</td>';
                html +='<td>' + item.email + '</td>';
                html +='</tr>';

            });

        html +='</tbody></table>';

        // Remover la tabla anterior.
        $('#tbdata').remove();

        // Agregar la nueva tabla.
        $('#jsdata').append(html);
    }
});