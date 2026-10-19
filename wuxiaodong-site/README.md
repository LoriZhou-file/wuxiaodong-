# 吴晓东官网(wuxiaodong)

静态网站 + 一个简单的内容后台。所有文字、展览、作品都存在 `content.json` 里,后台只是帮您改这个文件。

## 一、第一次上线(只做一次)

1. **把这个文件夹里的全部内容放进 GitHub 仓库**(替换旧文件)。最简单的办法:打开仓库页面 → Add file → Upload files → 把文件夹里的所有文件和子文件夹拖进去 → Commit。
   Vercel 会自动重新部署。项目设置里 Framework Preset 选 **Other**,不需要 Build Command。
2. **创建一个 GitHub 令牌(token)**,让后台有权写入仓库:
   GitHub → 右上角头像 → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token。
   - Repository access:Only select repositories → 选您的网站仓库
   - Permissions → Repository permissions → **Contents: Read and write**
   - 生成后复制令牌(只显示一次)。
3. **在 Vercel 里添加 4 个环境变量**:项目 → Settings → Environment Variables:

   | 名称 | 值 |
   |---|---|
   | `ADMIN_PASSWORD` | 您自己设一个长一点的后台密码 |
   | `GITHUB_TOKEN` | 上一步复制的令牌 |
   | `GITHUB_REPO` | `OmniNrf2/wuxiaodong-`(必须和仓库名完全一致,注意结尾的 `-`) |
   | `GITHUB_BRANCH` | `main`(如果您的主分支不叫 main,请改成实际名字) |

   添加完后,到 Deployments 里点最新一次部署的 ⋯ → **Redeploy**,让变量生效。
4. 打开 **https://wuxiaodong.vercel.app/admin** ,输入密码即可。

## 二、日常使用

- 在后台选择标签页(展览 / 作品 / 动态 / 关于 / 影像 / 基本信息),修改后点右上角 **保存**。
- 保存后网站约 30–60 秒更新(因为保存会提交到 GitHub,Vercel 再自动部署)。
- **新增展览**:展览 → + 新增 → 填名称、场馆、日期。结束日期过后,它会自动从"即将展出"移到"往期展览"。只知道月份时,在"日期显示文字"里填 `November 2026` / `2026年11月`。
- **换图片**:点图片旁的"选择文件",系统会自动缩小并上传,别忘了再点保存。
- **联系邮箱**:基本信息 → 联系邮箱。留空则网站不显示。
- **动态**栏目没有内容时,网站上会自动隐藏。

## 三、视频

后台不能上传大视频。把新视频放进仓库的 `media/` 文件夹(GitHub 网页上传限 25 MB 以内),然后在后台"影像"里填 `media/文件名.mp4`。更大的视频可以用外部直链。

## 四、安全

- 后台密码和令牌只存在 Vercel 的环境变量里,不在网站代码中。
- 后台页面不会被搜索引擎收录。请使用长密码,不要和其他账号共用。
- 如果怀疑泄露:在 Vercel 里改 `ADMIN_PASSWORD`,在 GitHub 里删除并重建令牌即可。

## 文件说明

- `index.html` `style.css` `main.js`:公开网站
- `content.json`:所有内容(中英文)
- `admin/`:后台页面
- `api/`:后台用的三个小接口(读取、保存、上传图片)
- `images/` `media/`:图片与视频
