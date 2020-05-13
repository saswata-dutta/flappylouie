function network(p) { // p could be any variable name
    let x = 100; 
    let y = 100;
    let r = 20;
    let nodes = [6,6,2];
    let layers = ['i', 'h', 'o'];
    let w = false;
    let b = null;
    p.setup = function() {
      p.createCanvas(350, 350);
    };
  
    p.draw = function() {
      p.background(255);
      p.fill(0);
      for(let i = 0; i < nodes.length; i++) {
          p.drawNodes(nodes[i], layers[i]);
      }
      if(w) {
          p.drawWeights();
      } 
    };

    p.drawNodes = function(count, type) {
        p.strokeWeight(3);
        p.stroke('#e66290')
        let x = 0;
        if(type === 'i') {
            x = 20;
        } else if(type === 'h') {
            x = p.width / 2;
        } else {
            x = p.width - 20;
        }

        let y = floor(p.height / count);
        let yMid = y/2;
        for(let i = 0; i < count; i++) {
            p.circle(x, yMid, r)
            yMid += y
        }
    }

    p.showWeights = function(bird) {
        b = bird;
        w = true;
    }

    p.drawWeights = function() {
        let y = floor(p.height / nodes[0]);
        let yMid = y/2;
        let x = 20;

        let x2 = p.width/2;
        let y2 = floor(p.height / nodes[1]);
        let y2Mid = y2/2;
        let ih = 0;
        let ho = 0;
        if(b === 1) {
            ih = 1;
            ho = 1;
        } else {
            ih = b.brain.weights_ih.data;
            ho = b.brain.weights_ho.data;
        }
        
        
        for(let i = 0; i < nodes[1]; i++) {
            for(let j = 0; j < nodes[0]; j++) {
                let val = b === 1 ? ih : 6.5 * ih[j][i];
                if(val <= 1) {
                    val = 1;
                }
                p.strokeWeight(val);
                p.stroke(130, 124, 230);
                p.line(x, yMid, x2, y2Mid);
                yMid += y;
            }
            yMid = y / 2
            y2Mid += y2;
        }

        
        y = floor(p.height / nodes[1]);
        yMid = y/2;
        x = p.width / 2;
        
        x2 = p.width - 20;
        y2 = floor(p.height / nodes[2]);
        y2Mid = y2/2;
        
        for(let i = 0; i < nodes[1]; i++) {
            for(let j = 0; j < nodes[2]; j++) {
                let val = b === 1 ? ho : (ho[j][i] * 6.5);
                if(val <= 1) {
                    val = 1;
                }
                p.strokeWeight(val);
                p.stroke(130, 124, 230);
                p.line(x, yMid, x2, y2Mid);
                y2Mid += y2;
            }
            yMid += y;
            y2Mid = y2 / 2;
        }
    }
};
