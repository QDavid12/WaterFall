var waterfall = {
    container: document.getElementById("waterfall"),
    scrollTop: document.documentElement.scrollTop || document.body.scrollTop, 
    data: {
        n: 0,
        info: []
    },
    width: 246,
    padding: 60,
    marginRight: 5,
    marginBottom: 10,
    colums: {
        n: 0,
        height: []
    },
    getWidth: function(){
        return document.body.clientWidth;
    },
    refresh: function(){
        if(!this.data.length){return false;}
    },
    append: function(data){
        json = eval("(" + data + ")");
        console.log(json.to);
        for(var j=json.from-1;j<json.to;j++){

            //console.log(j);
            var data = json[j+1];
            var w = data.width;
            var h = Math.ceil(( data.height / data.width ) * (this.width - 46));
            var a = this.c(this.container, "div", "card");
            var n = this.getMinCol();
            a.className += " col" + n;
            a.style.top = this.colums.height[n] + "px";
            a.style.left = n * (this.width + this.marginRight) + "px";
            a.setAttribute("data-id", data.id);
            this.colums.height[n] += h + this.padding + this.marginBottom;
            a.setAttribute("data-height", h);
            a.setAttribute("data-columNumber", n);
            var i = this.c(a, "img");
            i.style.width = this.width;
            i.style.height = h;
            i.src = data.src;
            var p = this.c(a, "p");
            p.innerHTML = "picture - " + data.id;
            var info = {
                width: w,
                height: h,
                container: a,
                p: p
            }
            this.data.info[this.data.n] = info;
            this.data.n += 1;

        }
    },
    load: function(from, to){
        var a = this.ajax({
            data: {
                from: from,
                to: to
            },
            success: function(data){
                waterfall.append(data);
            }
        });
    },
    getMinCol: function(){
        var n = this.colums.n;
        var min = this.colums.height[n-1];
        var num = n-1;
        for(var i=n-2; i>=0; i--){
            if(this.colums.height[i]<=min){
                num = i;
            }
        }
        return num;
    },
    c: function(f, a, b, c){
        var s = document.createElement(a);
        s.className = b || '';
        if(c){
            s.id = c;
        }
        f.appendChild(s);
        return s;
    },
    init: function(){
        //console.log(this.getWidth());
        this.colums.n = Math.floor(this.getWidth() / this.width);
        for (var i = 0; i<this.colums.n; i++){
            this.colums.height[i] = 0;
        }
        //console.log(this.colums);
        this.load(1,38);
        var o = document.body.onresize;
        document.body.onresize = function(){
            //resize here
            waterfall.resize();
            if(typeof(o)=="function"){o();}
        }
    },
    resize: function(){
        //console.log(this.getWidth());
        var n = Math.floor(this.getWidth() / this.width);
        console.log(n);
        if(n==this.colums.n){
            return;
        }
        this.colums.n = n;
        var l = this.data.info.length;
        this.colums.height = [];
        for(var i=0;i<n;i++){
            this.colums.height[i] = 0;
        }
        for(var i=0;i<l;i++){
            var col = this.getMinCol();
            console.log(this.getMinCol());
            var d = this.data.info[i];
            d.container.style.left = col * this.width + "px";
            d.container.style.top = this.colums.height[col] + "px";
            this.colums.height[col] +=  d.height + this.padding +this.marginBottom;
        }

    },
    ajax: function(c){
        var x = new XMLHttpRequest();
        x.open(c.method||"GET", c.url||"/php/getImage.php?from="+c.data.from+"&to="+c.data.to, c.async||true);
        x.send(null);
        x.onreadystatechange = function() {
            if (x.readyState == 4 && x.status ==200){
                c.success(x.responseText);
            }
        }
    }
}