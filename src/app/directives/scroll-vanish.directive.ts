// tutorial source https://www.joshmorony.com/creating-a-custom-scroll-vanish-directive-with-ionic-web-components/
import { Directive, Input, ElementRef, Renderer2, OnInit } from "@angular/core";
import { DomController } from "@ionic/angular";
@Directive({
  selector: "[myScrollVanish]"
})
export class ScrollVanishDirective implements OnInit {
  
  @Input("myScrollVanish") scrollArea: any;

  private hidden: boolean = false;
  private triggerDistance: number = 30;
  private height = "80px";
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private domCtrl: DomController
  ) {}

  ngOnInit() {
    this.initStyles();
    
    console.log(this.scrollArea);

    this.scrollArea.ionScroll.subscribe(scrollEvent => {
      console.log('scrollEvent');
      
      let delta = scrollEvent.detail.deltaY;
      // this.domCtrl.write(() => {
      //   this.renderer.setStyle(this.element.nativeElement, "transform", "translateY(-"+ delta/20 +"px)");
      // });
      if (scrollEvent.detail.currentY === 0 && this.hidden) {
        this.show();
      } else if (!this.hidden && delta > this.triggerDistance) {
        this.hide();
      } else if (this.hidden && delta < -this.triggerDistance) {
        this.show();
      }
    },
    (err)=>{
      console.log(err)
    });
  }

  initStyles() {
    console.log('scrollEvent');

    this.domCtrl.write(() => {
      this.renderer.setStyle(
        this.element.nativeElement,
        "transition",
        "0.5s linear"
      );
      this.renderer.setStyle(this.element.nativeElement, "height", this.height);
    });
  }

  hide() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, "min-height", "0px");
      this.renderer.setStyle(this.element.nativeElement, "height", "0px");
      // this.renderer.setStyle(this.element.nativeElement, "opacity", "0");
      this.renderer.setStyle(this.element.nativeElement, "padding", "0");
    });

    this.hidden = true;
  }

  show() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, "height", this.height);
      // this.renderer.removeStyle(this.element.nativeElement, "opacity");
      this.renderer.removeStyle(this.element.nativeElement, "min-height");
      this.renderer.removeStyle(this.element.nativeElement, "padding");
    });

    this.hidden = false;
  }
}
