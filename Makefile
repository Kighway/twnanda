PY?=python
PELICAN?=pelican
PELICANOPTS=

BASEDIR=$(CURDIR)
THEMEDIR=$(BASEDIR)/theme
CSSDIR=$(THEMEDIR)/static/css
SCSSDIR=$(THEMEDIR)/styling
INPUTDIR=$(BASEDIR)/content
CACHEDIR=$(BASEDIR)/cache
OUTPUTDIR=$(BASEDIR)/output
PLUGINSDIR=$(BASEDIR)/plugins
CONFFILE=$(BASEDIR)/pelicanconf.py
PUBLISHCONF=$(BASEDIR)/publishconf.py

# pelican plugins
I18N_SUBSITES_DIR=$(PLUGINSDIR)/i18n_subsites


default: html serve

download:
	# download pelican i18n_subsites plugin
	[ ! -d $(I18N_SUBSITES_DIR) ] || rm -rf $(I18N_SUBSITES_DIR)
	mkdir -p $(I18N_SUBSITES_DIR)
	wget -P $(I18N_SUBSITES_DIR) https://raw.githubusercontent.com/getpelican/pelican-plugins/master/i18n_subsites/__init__.py
	wget -P $(I18N_SUBSITES_DIR) https://raw.githubusercontent.com/getpelican/pelican-plugins/master/i18n_subsites/i18n_subsites.py
	# download normalize.css
	wget -O $(SCSSDIR)/_normalize302.scss http://necolas.github.com/normalize.css/3.0.2/normalize.css

scss:
	[ -d $(CSSDIR) ] || mkdir -p $(CSSDIR)
	$(PY) -mscss < $(SCSSDIR)/style.scss -I $(SCSSDIR) -o $(CSSDIR)/style.css

html: scss
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

clean:
	[ ! -d $(OUTPUTDIR) ] || rm -rf $(OUTPUTDIR)
	[ ! -d $(CACHEDIR) ]  || rm -rf $(CACHEDIR)

serve:
ifdef PORT
	cd $(OUTPUTDIR) && $(PY) -m pelican.server $(PORT)
else
	cd $(OUTPUTDIR) && $(PY) -m pelican.server
endif

publish: scss clean
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(PUBLISHCONF) $(PELICANOPTS)

.PHONY: download scss html clean serve publish
