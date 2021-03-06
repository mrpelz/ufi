declare type LayerState = {
  layout?: {
    alignX?: 'left' | 'center' | 'right';
    alignY?: 'top' | 'center' | 'bottom';
    backgroundColor?: string;
    fromColumn?: number;
    fromRow?: number;
    spanColumns?: number;
    spanRows?: number;
    toColumn?: number;
    toRow?: number;
  };
  data?: Object;
};

declare type PreloadType =
  |'audio'
  |'document'
  |'embed'
  |'fetch'
  |'font'
  |'image'
  |'object'
  |'script'
  |'style'
  |'track'
  |'worker'
  |'video'
  |'modulepreload';

declare type PreloadMIMEType =
  | '.c++'
  | '.jfif-tbnl'
  | '.mc$'
  | '.x-png'
  | 'application/arj'
  | 'application/base64'
  | 'application/base64'
  | 'application/binhex'
  | 'application/binhex4'
  | 'application/book'
  | 'application/book'
  | 'application/cdf'
  | 'application/clariscad'
  | 'application/commonground'
  | 'application/drafting'
  | 'application/dsptype'
  | 'application/dxf'
  | 'application/ecmascript'
  | 'application/envoy'
  | 'application/excel'
  | 'application/excel'
  | 'application/excel'
  | 'application/excel'
  | 'application/excel'
  | 'application/excel'
  | 'application/excel'
  | 'application/excel'
  | 'application/excel'
  | 'application/excel'
  | 'application/excel'
  | 'application/freeloader'
  | 'application/futuresplash'
  | 'application/gnutar'
  | 'application/groupwise'
  | 'application/hlp'
  | 'application/hta'
  | 'application/i-deas'
  | 'application/iges'
  | 'application/iges'
  | 'application/inf'
  | 'application/java-byte-code'
  | 'application/java'
  | 'application/javascript'
  | 'application/lha'
  | 'application/lzx'
  | 'application/mac-binary'
  | 'application/mac-binhex'
  | 'application/mac-binhex40'
  | 'application/mac-compactpro'
  | 'application/macbinary'
  | 'application/marc'
  | 'application/mbedlet'
  | 'application/mime'
  | 'application/mspowerpoint'
  | 'application/mspowerpoint'
  | 'application/mspowerpoint'
  | 'application/mspowerpoint'
  | 'application/msword'
  | 'application/msword'
  | 'application/mswrite'
  | 'application/netmc'
  | 'application/octet-stream'
  | 'application/octet-stream'
  | 'application/octet-stream'
  | 'application/octet-stream'
  | 'application/octet-stream'
  | 'application/octet-stream'
  | 'application/octet-stream'
  | 'application/octet-stream'
  | 'application/octet-stream'
  | 'application/octet-stream'
  | 'application/octet-stream'
  | 'application/octet-stream'
  | 'application/octet-stream'
  | 'application/octet-stream'
  | 'application/octet-stream'
  | 'application/octet-stream'
  | 'application/oda'
  | 'application/pdf'
  | 'application/pkcs-12'
  | 'application/pkcs-crl'
  | 'application/pkcs10'
  | 'application/pkcs7-mime'
  | 'application/pkcs7-mime'
  | 'application/pkcs7-signature'
  | 'application/pkix-cert'
  | 'application/pkix-cert'
  | 'application/pkix-crl'
  | 'application/plain'
  | 'application/postscript'
  | 'application/postscript'
  | 'application/postscript'
  | 'application/powerpoint'
  | 'application/pro_eng'
  | 'application/pro_eng'
  | 'application/ringing-tones'
  | 'application/rtf'
  | 'application/rtf'
  | 'application/sdp'
  | 'application/sea'
  | 'application/set'
  | 'application/sla'
  | 'application/smil'
  | 'application/smil'
  | 'application/solids'
  | 'application/sounder'
  | 'application/step'
  | 'application/streamingmedia'
  | 'application/toolbook'
  | 'application/vda'
  | 'application/vnd.hp-hpgl'
  | 'application/vnd.hp-hpgl'
  | 'application/vnd.hp-hpgl'
  | 'application/vnd.hp-pcl'
  | 'application/vnd.ms-excel'
  | 'application/vnd.ms-excel'
  | 'application/vnd.ms-excel'
  | 'application/vnd.ms-excel'
  | 'application/vnd.ms-excel'
  | 'application/vnd.ms-excel'
  | 'application/vnd.ms-pkiapplication/step'
  | 'application/vnd.ms-pkiapplication/x-navistyle'
  | 'application/vnd.ms-pkitext/plain'
  | 'application/vnd.ms-pkitext/plain'
  | 'application/vnd.ms-powerpoint'
  | 'application/vnd.ms-powerpoint'
  | 'application/vnd.ms-powerpoint'
  | 'application/vnd.ms-powerpoint'
  | 'application/vnd.ms-powerpoint'
  | 'application/vnd.ms-project'
  | 'application/vnd.nokia.configuration-message'
  | 'application/vnd.nokia.ringing-tone'
  | 'application/vnd.rn-realmedia'
  | 'application/vnd.rn-realplayer'
  | 'application/vndapplication/fractals'
  | 'application/vocaltec-media-file'
  | 'application/wordperfect'
  | 'application/wordperfect'
  | 'application/wordperfect'
  | 'application/wordperfect6application/wordperfect'
  | 'application/wordperfect6application/wordperfect6application/msword'
  | 'application/x-123'
  | 'application/x-aim'
  | 'application/x-authorware-bin'
  | 'application/x-authorware-map'
  | 'application/x-authorware-seg'
  | 'application/x-bcpio'
  | 'application/x-binary'
  | 'application/x-binhex40'
  | 'application/x-bsh'
  | 'application/x-bsh'
  | 'application/x-bzip'
  | 'application/x-bzip2'
  | 'application/x-bzip2'
  | 'application/x-cdf'
  | 'application/x-cdlink'
  | 'application/x-chat'
  | 'application/x-chat'
  | 'application/x-cmu-raster'
  | 'application/x-cocoa'
  | 'application/x-compactpro'
  | 'application/x-compress'
  | 'application/x-compressed'
  | 'application/x-compressed'
  | 'application/x-compressed'
  | 'application/x-compressed'
  | 'application/x-conference'
  | 'application/x-cpio'
  | 'application/x-cpt'
  | 'application/x-csh'
  | 'application/x-deepv'
  | 'application/x-director'
  | 'application/x-director'
  | 'application/x-director'
  | 'application/x-dvi'
  | 'application/x-elc'
  | 'application/x-envoy'
  | 'application/x-envoy'
  | 'application/x-esrehber'
  | 'application/x-excel'
  | 'application/x-excel'
  | 'application/x-excel'
  | 'application/x-excel'
  | 'application/x-excel'
  | 'application/x-excel'
  | 'application/x-excel'
  | 'application/x-excel'
  | 'application/x-excel'
  | 'application/x-excel'
  | 'application/x-excel'
  | 'application/x-frame'
  | 'application/x-freelance'
  | 'application/x-gsp'
  | 'application/x-gss'
  | 'application/x-gtar'
  | 'application/x-gzip'
  | 'application/x-gzip'
  | 'application/x-hdf'
  | 'application/x-helpfile'
  | 'application/x-helpfile'
  | 'application/x-httpd-imap'
  | 'application/x-ima'
  | 'application/x-internett-signup'
  | 'application/x-inventor'
  | 'application/x-ip2'
  | 'application/x-java-class'
  | 'application/x-java-commerce'
  | 'application/x-javascript'
  | 'application/x-koan'
  | 'application/x-koan'
  | 'application/x-koan'
  | 'application/x-koan'
  | 'application/x-ksh'
  | 'application/x-latex'
  | 'application/x-latex'
  | 'application/x-lha'
  | 'application/x-lisp'
  | 'application/x-livescreen'
  | 'application/x-lotus'
  | 'application/x-lotusscreencam'
  | 'application/x-lzh'
  | 'application/x-lzx'
  | 'application/x-mac-binhex40'
  | 'application/x-macbinary'
  | 'application/x-magic-cap-package-1application/mcad'
  | 'application/x-mathcad'
  | 'application/x-meme'
  | 'application/x-midi'
  | 'application/x-midi'
  | 'application/x-mif'
  | 'application/x-mix-transfer'
  | 'application/x-mplayer2'
  | 'application/x-msexcel'
  | 'application/x-msexcel'
  | 'application/x-msexcel'
  | 'application/x-mspowerpoint'
  | 'application/x-navi-animation'
  | 'application/x-navidoc'
  | 'application/x-navimap'
  | 'application/x-netcdf'
  | 'application/x-netcdf'
  | 'application/x-newton-compatible-pkg'
  | 'application/x-nokia-9000-communicator-add-on-software'
  | 'application/x-omc'
  | 'application/x-omcdatamaker'
  | 'application/x-omcregerator'
  | 'application/x-pagemaker'
  | 'application/x-pagemaker'
  | 'application/x-pcl'
  | 'application/x-pkcs10'
  | 'application/x-pkcs12'
  | 'application/x-pkcs7-certificates'
  | 'application/x-pkcs7-certreqresp'
  | 'application/x-pkcs7-mime'
  | 'application/x-pkcs7-mime'
  | 'application/x-pkcs7-signature'
  | 'application/x-portable-anymap'
  | 'application/x-project'
  | 'application/x-project'
  | 'application/x-project'
  | 'application/x-project'
  | 'application/x-qpro'
  | 'application/x-rtf'
  | 'application/x-sdp'
  | 'application/x-sea'
  | 'application/x-seelogo'
  | 'application/x-sh'
  | 'application/x-shar'
  | 'application/x-shar'
  | 'application/x-shockwave-flash'
  | 'application/x-sit'
  | 'application/x-sprite'
  | 'application/x-sprite'
  | 'application/x-stuffit'
  | 'application/x-sv4cpio'
  | 'application/x-sv4crc'
  | 'application/x-tar'
  | 'application/x-tbook'
  | 'application/x-tbook'
  | 'application/x-tcl'
  | 'application/x-texinfo'
  | 'application/x-texinfo'
  | 'application/x-troff-man'
  | 'application/x-troff-me'
  | 'application/x-troff-ms'
  | 'application/x-troff-msvideo'
  | 'application/x-troff'
  | 'application/x-troff'
  | 'application/x-troff'
  | 'application/x-ustar'
  | 'application/x-visio'
  | 'application/x-visio'
  | 'application/x-visio'
  | 'application/x-vnd.audioexplosionimage/naplps'
  | 'application/x-vnd.ls-xpix'
  | 'application/x-vrml'
  | 'application/x-wais-source'
  | 'application/x-wais-source'
  | 'application/x-winhelp'
  | 'application/x-wintalk'
  | 'application/x-world'
  | 'application/x-world'
  | 'application/x-wpwin'
  | 'application/x-wri'
  | 'application/x-x509-ca-cert'
  | 'application/x-x509-ca-cert'
  | 'application/x-x509-ca-cert'
  | 'application/x-x509-user-cert'
  | 'application/x-zip-compressed'
  | 'application/xml'
  | 'application/zip'
  | 'audio/aiff'
  | 'audio/aiff'
  | 'audio/aiff'
  | 'audio/basic'
  | 'audio/basic'
  | 'audio/it'
  | 'audio/make.myimage/x-portable-graymap'
  | 'audio/make'
  | 'audio/make'
  | 'audio/make'
  | 'audio/mid'
  | 'audio/midi'
  | 'audio/midi'
  | 'audio/midi'
  | 'audio/mod'
  | 'audio/mpeg'
  | 'audio/mpeg'
  | 'audio/mpeg'
  | 'audio/mpeg'
  | 'audio/mpeg'
  | 'audio/mpeg3'
  | 'audio/nspaudio'
  | 'audio/s3m'
  | 'audio/tsp-audio'
  | 'audio/tsplayer'
  | 'audio/voc'
  | 'audio/voxware'
  | 'audio/wav'
  | 'audio/x-adpcm'
  | 'audio/x-aiff'
  | 'audio/x-aiff'
  | 'audio/x-aiff'
  | 'audio/x-au'
  | 'audio/x-gsm'
  | 'audio/x-gsm'
  | 'audio/x-jam'
  | 'audio/x-liveaudio'
  | 'audio/x-mid'
  | 'audio/x-mid'
  | 'audio/x-midi'
  | 'audio/x-midi'
  | 'audio/x-mod'
  | 'audio/x-mpeg-3'
  | 'audio/x-mpeg'
  | 'audio/x-mpequrl'
  | 'audio/x-nspaudio'
  | 'audio/x-nspaudio'
  | 'audio/x-pn-realaudio-plugin'
  | 'audio/x-pn-realaudio-plugin'
  | 'audio/x-pn-realaudio-plugin'
  | 'audio/x-pn-realaudio'
  | 'audio/x-pn-realaudio'
  | 'audio/x-pn-realaudio'
  | 'audio/x-pn-realaudio'
  | 'audio/x-pn-realaudio'
  | 'audio/x-psid'
  | 'audio/x-realaudio'
  | 'audio/x-twinvq-plugin'
  | 'audio/x-twinvq-plugin'
  | 'audio/x-twinvq'
  | 'audio/x-vnd.audioexplosionvideo/x-motion-jpeg'
  | 'audio/x-voc'
  | 'audio/x-wav'
  | 'audio/xm'
  | 'chemical/x-pdb'
  | 'chemical/x-pdb'
  | 'drawing/x-dwf (old)'
  | 'i-world/i-vrml'
  | 'image/bmp'
  | 'image/bmp'
  | 'image/cmu-raster'
  | 'image/cmu-raster'
  | 'image/fif'
  | 'image/florian'
  | 'image/florian'
  | 'image/g3fax'
  | 'image/gif'
  | 'image/ief'
  | 'image/ief'
  | 'image/jpeg'
  | 'image/jpeg'
  | 'image/jpeg'
  | 'image/jpeg'
  | 'image/jpeg'
  | 'image/jutvision'
  | 'image/naplps'
  | 'image/pict'
  | 'image/pict'
  | 'image/pjpeg'
  | 'image/pjpeg'
  | 'image/pjpeg'
  | 'image/pjpeg'
  | 'image/png'
  | 'image/png'
  | 'image/svg+xml'
  | 'image/tiff'
  | 'image/tiff'
  | 'image/vasa'
  | 'image/vnd.rn-realpix'
  | 'image/vnd.wapapplication/vndapplication/msword'
  | 'image/vndapplication/excel'
  | 'image/vndimage/vnd.net-fpx'
  | 'image/vndimage/x-dwg'
  | 'image/vndimage/x-dwg'
  | 'image/vndimage/x-dwg'
  | 'image/x-cmu-raster'
  | 'image/x-icon'
  | 'image/x-jg'
  | 'image/x-jps'
  | 'image/x-niff'
  | 'image/x-niff'
  | 'image/x-pcx'
  | 'image/x-pict'
  | 'image/x-portable-anymap'
  | 'image/x-portable-bitmap'
  | 'image/x-portable-greymap'
  | 'image/x-portable-pixmap'
  | 'image/x-quicktime'
  | 'image/x-quicktime'
  | 'image/x-quicktime'
  | 'image/x-rgb'
  | 'image/x-tiff'
  | 'image/x-tiff'
  | 'image/x-windows-bmp'
  | 'image/x-xbitmap'
  | 'image/x-xbm'
  | 'image/x-xpixmap'
  | 'image/x-xpixmap'
  | 'image/x-xwd'
  | 'image/x-xwindowdump'
  | 'image/xbm'
  | 'image/xpm'
  | 'message/rfc822'
  | 'message/rfc822'
  | 'message/rfc822'
  | 'model/iges'
  | 'model/iges'
  | 'model/vndapplication/acad'
  | 'model/vrml'
  | 'model/vrml'
  | 'model/vrml'
  | 'model/x-pov'
  | 'multipart/x-gzip'
  | 'multipart/x-ustar'
  | 'multipart/x-zip'
  | 'music/crescendo'
  | 'music/crescendo'
  | 'music/x-karaoke'
  | 'paleovu/x-pv'
  | 'text/asp'
  | 'text/css'
  | 'text/ecmascript'
  | 'text/html'
  | 'text/html'
  | 'text/html'
  | 'text/html'
  | 'text/html'
  | 'text/javascript'
  | 'text/mcf'
  | 'text/pascal'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/plain'
  | 'text/richtext'
  | 'text/richtext'
  | 'text/richtext'
  | 'text/scriplet'
  | 'text/sgml'
  | 'text/sgml'
  | 'text/tab-separated-values'
  | 'text/uri-list'
  | 'text/uri-list'
  | 'text/uri-list'
  | 'text/uri-list'
  | 'text/vnd.fmivideo/x-atomic3d-feature'
  | 'text/vnd.rn-realtext'
  | 'text/vnd.wapapplication/vnd.waptext/vnd.wapapplication/vnd.wapapplication/msword'
  | 'text/vndtext/html'
  | 'text/webviewhtml'
  | 'text/x-asm'
  | 'text/x-asm'
  | 'text/x-audiosoft-intra'
  | 'text/x-c'
  | 'text/x-c'
  | 'text/x-c'
  | 'text/x-component'
  | 'text/x-fortran'
  | 'text/x-fortran'
  | 'text/x-fortran'
  | 'text/x-fortran'
  | 'text/x-h'
  | 'text/x-h'
  | 'text/x-java-source'
  | 'text/x-java-source'
  | 'text/x-la-asf'
  | 'text/x-m'
  | 'text/x-pascal'
  | 'text/x-script.perl-module'
  | 'text/x-script.zsh'
  | 'text/x-script'
  | 'text/x-scriptapplication/x-bsh'
  | 'text/x-scriptapplication/x-bytecode.elisp (compiled elisp)'
  | 'text/x-scriptapplication/x-bytecodeaudio/vndx-world/x-3dmf'
  | 'text/x-scriptapplication/x-pixclscript'
  | 'text/x-scriptapplication/x-pointplus'
  | 'text/x-scriptaudio/nspaudio'
  | 'text/x-scriptimage/vnd.rn-realflash'
  | 'text/x-scripttext/plain'
  | 'text/x-scripttext/x-scriptapplication/x-tex'
  | 'text/x-scripttext/x-scriptvideo/x-scm'
  | 'text/x-server-parsed-html'
  | 'text/x-server-parsed-html'
  | 'text/x-setext'
  | 'text/x-sgml'
  | 'text/x-sgml'
  | 'text/x-speech'
  | 'text/x-speech'
  | 'text/x-uil'
  | 'text/x-uuencode'
  | 'text/x-uuencode'
  | 'text/x-vcalendar'
  | 'text/xml'
  | 'video/animaflex'
  | 'video/avi'
  | 'video/avs-video'
  | 'video/dl'
  | 'video/fli'
  | 'video/gl'
  | 'video/mp4'
  | 'video/mpeg'
  | 'video/mpeg'
  | 'video/mpeg'
  | 'video/mpeg'
  | 'video/mpeg'
  | 'video/mpeg'
  | 'video/mpeg'
  | 'video/mpeg'
  | 'video/msvideo'
  | 'video/quicktime'
  | 'video/quicktime'
  | 'video/quicktime'
  | 'video/vdo'
  | 'video/vivo'
  | 'video/vnd.rn-realvideo'
  | 'video/vndapplication/vocaltec-media-desc'
  | 'video/vndvideo/vivo'
  | 'video/vosaic'
  | 'video/x-amt-demorun'
  | 'video/x-amt-showrun'
  | 'video/x-dl'
  | 'video/x-dv'
  | 'video/x-dv'
  | 'video/x-fli'
  | 'video/x-gl'
  | 'video/x-isvideo'
  | 'video/x-mpeg'
  | 'video/x-mpeg'
  | 'video/x-mpeq2a'
  | 'video/x-ms-asf-plugin'
  | 'video/x-ms-asf'
  | 'video/x-ms-asf'
  | 'video/x-msvideo'
  | 'video/x-qtc'
  | 'video/x-sgi-movie'
  | 'video/x-sgi-movie'
  | 'windows/metafile'
  | 'www/mime'
  | 'x-conference/x-cooltalk'
  | 'x-music/x-midi'
  | 'x-music/x-midi'
  | 'x-world/x-3dmf'
  | 'x-world/x-3dmf'
  | 'x-world/x-3dmf'
  | 'x-world/x-svr'
  | 'x-world/x-vrml'
  | 'x-world/x-vrml'
  | 'x-world/x-vrml'
  | 'x-world/x-vrt'
  | 'xgl/drawing'
  | 'xgl/movie'
  ;
