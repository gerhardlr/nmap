rm workspaces/nmap/public/map/tiles -rf
cd /gdal2tiles-leaflet/ &&\
    python3 gdal2tiles.py -l -p raster -z 2-6 -w none \
        /workspaces/nmap/scripts/nicolene.jpg \
        /workspaces/nmap/public/map/tiles &&\
    cd /workspaces/nmap/scripts/

