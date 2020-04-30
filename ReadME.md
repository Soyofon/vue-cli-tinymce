# Vue-Cli TinyMCE 整合

### 安裝 Tinymce 套件

``` bash
    # npm
    npm install tinymce @tinymce/tinymce-vue -S
```

---

### 專案配置

- Tinymce 語系包下載：https://www.tiny.cloud/get-tiny/language-packages/

- 在 *public* 建立 *tinymce* 文件夾

    ![](https://i.imgur.com/6Fts2U4.jpg)

- 將 *node_modules/tinymce* 的 *skins* 文件夾與語系包的 *langs* 文件夾複製到 *public/tinymce*

    ![](https://i.imgur.com/goyaDLY.jpg)

---

### 使用方式

- 引入 *Tinymce*
    ``` javascript
    import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/silver'
    
    // Tinymce for Vue 組件
    import Editor from '@tinymce/tinymce-vue'
    ```
- 在組件傳入註冊的 *api-key* 及初始設定
    ``` html
    <editor
        api-key="enter your api key",
        :init="init"
    />
    ```

- 初始化 Tinymce 編輯器
    ``` javscript
    mounted() {
        // tinymce 初始化
        tinymce.init({})
    }
    ```
    
    #### plugins
    依照需求引用 plugins，如果有需求也可自訂 plugin
    ``` javascript
    // 更多插件参考：https://www.tiny.cloud/docs/plugins/

    // 编辑器插件 plugins
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
    ```    
