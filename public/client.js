$(document).ready(function() {
    $('#upload').on('submit', function(e) {
        e.preventDefault();
        const $pane = $('#pane').append('<p>').text('uploading...');
        const formData = new FormData();
        const $file = $('#fileInput'); // jQuery obj
        formData.append('upfile', $file[0].files[0]); // File object. file[0].value has DOMString for full file path 
        axios.post('/api/fileanalyse', formData, { // (path, data, option) don't forget to add base url ('/api')
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => { // 'res' is the whole response object({config, data, headers, request, status. statusText}). The data sent with res.json() is inside data field.
            const result = resToHtml(res);
            $pane.html(result);
        })
        .catch(err => {
            console.log(err);
        });

    })
    
    function resToHtml(res) {
        const resObj = (typeof res === 'string') ? JSON.parse(res) : res;
        let data = resObj.data ? resObj.data : resObj;
        let result = '<div class="log-items">';
        Object.keys(data).forEach(key => {
            if (key === 'size') {
                data[key] = filesize(data[key]);
            }
            result += '<p><strong>' + key + '</strong>: ' + data[key] +'</p>'
        })
        result += '</div>';
        return result;
    }
});

