### 启动

```shell
  yarn
  yarn start
```

### eslint

```shell
    yarn  lint
```

提交自动检测：

```json
 "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,jsx,vue,ts,tsx}": [
      "vue-cli-service lint",
      "git add"
    ]
  }
```
