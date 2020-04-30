<template>
  <editor
    api-key="u5dlq9ofjytk4eab59oduo2bah7pmb5dg4wgx1d7g5jvb87t"
    :init="init"
  />
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// 编辑器插件 plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/table'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/preview'
// 自訂編輯器插件 plugins
import '@/utils/tinymce/plugins/fileuploader'

export default {
  name: 'TinymceEditor',
  components: {
    Editor
  },
  data() {
    return {
      init: {
        language_url: '/tinymce/langs/zh_TW.js',
        language: 'zh_TW',
        skin_url: '/tinymce/skins/ui/oxide',
        content_css: '/tinymce/skins/content/default/content.css',
        height: 220,
        resize: true,
        plugins:
          'charmap table code codesample image link anchor preview fileuploader',
        toolbar:
          'charmap | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | fontselect fontsizeselect | code codesample | image fileuploader | anchor link | preview',
        font_formats:
          '新細明體=新細明體,serif;' +
          '標楷體=標楷體,DFKai-sb;' +
          '思源體=Noto Sans TC;' +
          '仿宋體=cwTeXFangSong,serif;' +
          '明體=cwTeXMing, serif;' +
          '圓體=cwTeXYen, sans-serif;' +
          'Andale Mono=andale mono,monospace;' +
          'Arial=arial,helvetica,sans-serif;' +
          'Arial Black=arial black,sans-serif;' +
          'Book Antiqua=book antiqua,palatino,serif;' +
          'Comic Sans MS=comic sans ms,sans-serif;' +
          'Courier New=courier new,courier,monospace;' +
          'Georgia=georgia,palatino,serif;' +
          'Helvetica=helvetica,arial,sans-serif;' +
          'Impact=impact,sans-serif;' +
          'Symbol=symbol;' +
          'Tahoma=tahoma,arial,helvetica,sans-serif;' +
          'Terminal=terminal,monaco,monospace;' +
          'Times New Roman=times new roman,times,serif;' +
          'Trebuchet MS=trebuchet ms,geneva,sans-serif;' +
          'Verdana=verdana,geneva,sans-serif;' +
          'Webdings=webdings;' +
          'Wingdings=wingdings,zapf dingbats;',
        codesample_languages: [
          { text: 'ASP.NET (C#)', value: 'aspnet' },
          { text: 'BASIC', value: 'basic' },
          { text: 'C', value: 'c' },
          { text: 'C#', value: 'csharp' },
          { text: 'C++', value: 'cpp' },
          { text: 'C-like', value: 'clike' },
          { text: 'CSS', value: 'css' },
          { text: 'HTML', value: 'markup' },
          { text: 'Java', value: 'java' },
          { text: 'JSON', value: 'json' },
          { text: 'Javascript', value: 'javascript' },
          { text: 'Kotlin', value: 'kotlin' },
          { text: 'Less', value: 'less' },
          { text: 'Markdown', value: 'markdown' },
          { text: 'Objective-C', value: 'objectivec' },
          { text: 'Perl', value: 'perl' },
          { text: 'PHP', value: 'php' },
          { text: 'PL/SQL', value: 'plsql' },
          { text: 'Ruby', value: 'ruby' },
          { text: 'SQL', value: 'sql' },
          { text: 'Sass (Scss)', value: 'scss' },
          { text: 'Sass (Sass)', value: 'sass' },
          { text: 'TypeScript', value: 'typescript' },
          { text: 'VB.NET', value: 'vbnet' },
          { text: 'Visual Basic', value: 'visual-basic' }
        ],
        branding: false,
        file_upload_fallback: this.onFileUploadEvent
      }
    }
  },
  computed: {
    toolbarConfig() {
      return this.toolbar.join(' | ')
    },
    fontFormatsConfig() {
      return this.fontFormats.join('')
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    onFileUploadEvent(editor, file, fileName) {
      this.$emit('file-upload', editor, file, fileName)
    }
  }
}
</script>
