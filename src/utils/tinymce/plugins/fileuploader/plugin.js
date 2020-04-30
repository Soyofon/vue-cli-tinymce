import tinymce from 'tinymce/tinymce'
;(function() {
  'use strict'

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager')

  var getExtension = function(path) {
    var basename = path.split(/[\\/]/).pop() // extract file name from full path ...
    // (supports `\\` and `/` separators)
    var pos = basename.lastIndexOf('.') // get last position of `.`

    if (basename === '' || pos < 1)
      // if file name is empty or ...
      return '' //  `.` not found (-1) or comes first (0)

    return basename.slice(pos + 1) // extract extension ignoring `.`
  }

  var open = function(editor) {
    var getFileUploadFallback = function() {
      return editor.getParam('file_upload_fallback')
    }

    editor.windowManager.open({
      title: 'File Uploader',
      size: 'medium',
      body: {
        type: 'panel',
        items: [
          {
            type: 'htmlpanel',
            html: `
            <div style="display: flex; width: 100%; align-items: center;">
              <input id="fileName" style="padding-left: 3px; font-size: 14px; margin: 5px; width: 300px; height: 32px; border: 1px solid #ccc; flex: 4; margin-right: 0; border-right: 0;"/>
              <input type="button" id="fileUploadBtn" value="選擇" style="height: 32px; margin: 5px; width: 50px; text-align: center; background: #2276d2; color: #fff; flex: 1; margin-left: 0;" />
              <span id="fileUploadSizeText" style="flex: 1;"></span>
            </div>
            <input id="fileAttach" name="file" type="file" class="input form-control" accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .pdf, .txt" style="display: none;"/>
            <div class="invalid-feedback" style="color:#dc3545 ">此欄必填</div>`
          }
        ]
      },
      buttons: [
        {
          type: 'submit',
          name: 'submit',
          text: 'Save',
          primary: true
        },
        {
          type: 'cancel',
          name: 'cancel',
          text: 'Cancel'
        }
      ],
      onSubmit: function(api) {
        const file = document.querySelector('#fileAttach').files[0]
        const fileName = document.querySelector('#fileName').value
        const ext = getExtension(file.name).toLowerCase()
        const allows = [
          'doc',
          'docx',
          'ppt',
          'pptx',
          'xls',
          'xlsx',
          'pdf',
          'txt'
        ]
        if (allows.indexOf(ext) >= 0) {
          api.close()

          const fallback = getFileUploadFallback()
          fallback(editor, file, fileName)
        } else {
          tinymce.activeEditor.windowManager.alert(
            '\u6a94\u6848\u683c\u5f0f\u9650\u005a\u0069\u0070\u3001\u0057\u006f\u0072\u0064\u3001\u0045\u0078\u0063\u0065\u006c\u3001\u0050\u006f\u0077\u0065\u0072\u0050\u006f\u0069\u006e\u0074\u3001\u0050\u0044\u0046\u8207\u6587\u5b57\u6a94!'
          )
        }
      }
    })
  }

  var Dialog = { open: open }

  var register = function(editor) {
    editor.addCommand('mceCodeEditor', function() {
      Dialog.open(editor)
    })
  }
  var Commands = { register: register }

  var register$1 = function(editor) {
    editor.ui.registry.addButton('fileuploader', {
      icon: 'browse',
      tooltip: 'File Uploader',
      onAction: function() {
        return Dialog.open(editor)
      }
    })
    editor.ui.registry.addMenuItem('fileuploader', {
      icon: 'browse',
      text: 'File Uploader',
      onAction: function() {
        return Dialog.open(editor)
      }
    })
  }
  var Buttons = { register: register$1 }

  function Plugin() {
    global.add('fileuploader', function(editor) {
      Commands.register(editor)
      Buttons.register(editor)
      return {}
    })
  }

  document.addEventListener(
    'click',
    event => {
      if (event.target.matches('#fileUploadBtn')) {
        document.querySelector('#fileAttach').click()
      }
    },
    false
  )

  document.addEventListener(
    'change',
    event => {
      if (event.target.matches('#fileAttach')) {
        const fileAttach = document.querySelector('#fileAttach')
        const fileName = document.querySelector('#fileName')
        const fileUploadSizeText = document.querySelector('#fileUploadSizeText')

        if (event.target.files[0].size / 1024 / 1024 > 1) {
          fileAttach.classList.push('is-invalid')
        } else {
          fileAttach.classList.remove('is-invalid')
        }
        fileName.value = event.target.files[0].name

        fileUploadSizeText.innerText = bytesToSize(event.target.files[0].size)
      }
    },
    false
  )

  var bytesToSize = function(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes == 0) return '0 Byte'
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
  }

  Plugin()
})()
