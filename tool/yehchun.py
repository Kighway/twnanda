#!/usr/bin/env python
# -*- coding:utf-8 -*-

import re
import os

def replaceFootnote(filePath, output):
  with open(filePath, 'r') as f:
    with open(output, 'w') as fo:
      for line in f:
        result = re.sub(r' (\d+) ', r' [\1]_ ', line)
        fo.write(result)

def rstripFile(filePath, output):
  with open(filePath, 'r') as f:
    with open(output, 'w') as fo:
      for line in f:
        fo.write(line.rstrip() + '\n')

def replaceFootnote2(filePath, output):
  with open(filePath, 'r') as f:
    with open(output, 'w') as fo:
      for line in f:
        result = re.sub(r'^(\d+)\.', r'.. [\1]', line)
        fo.write(result)

if __name__ == '__main__':
  path = "../content/articles/anya/visuddhimagga/yehchun/chap01%zh.rst"
  replaceFootnote(path, "tmp1.rst")
  rstripFile("tmp1.rst", "tmp2.rst")
  replaceFootnote2("tmp2.rst", os.path.basename(path))
  os.remove("tmp1.rst")
  os.remove("tmp2.rst")