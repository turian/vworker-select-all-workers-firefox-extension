SRC_DIR = src
XPI_NAME = vworkerextension

package: 

	(cd $(SRC_DIR) && \
	zip -r ../$(XPI_NAME).xpi chrome chrome.manifest install.rdf)

.PHONY: package 

